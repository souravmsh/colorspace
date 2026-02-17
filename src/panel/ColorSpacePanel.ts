import * as vscode from 'vscode';
import { ColorManager } from '../colorManager';
import { WorkspaceColorScheme } from '../colors';

/**
 * Webview panel provider for ColorSpace
 */
export class ColorSpacePanel implements vscode.WebviewViewProvider {
    public static readonly viewType = 'colorspacePanel';
    private _view?: vscode.WebviewView;
    private colorManager: ColorManager;

    constructor(
        private readonly _extensionUri: vscode.Uri,
        colorManager: ColorManager
    ) {
        this.colorManager = colorManager;
    }

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        // Handle messages from the webview
        webviewView.webview.onDidReceiveMessage(async (data) => {
            switch (data.type) {
                case 'applyColor':
                    await this.colorManager.setWorkspaceColor(data.color);
                    await this.refresh();
                    break;
                case 'addCustomColor':
                    await this.colorManager.addCustomColor(data.color);
                    await this.refresh();
                    break;
                case 'deleteCustomColor':
                    await this.colorManager.deleteCustomColor(data.index);
                    await this.refresh();
                    break;
                case 'resetColor':
                    await this.colorManager.resetColor();
                    await this.refresh();
                    break;
                case 'requestData':
                    await this.refresh();
                    break;
            }
        });

        // Initial data load
        this.refresh();
    }

    public async refresh() {
        if (this._view) {
            const colors = await this.colorManager.getAllColors();
            const currentColor = await this.colorManager.getWorkspaceColor();

            this._view.webview.postMessage({
                type: 'updateData',
                data: {
                    fixedColors: colors.fixed,
                    customColors: colors.custom,
                    currentColor: currentColor
                }
            });
        }
    }

    private _getHtmlForWebview(webview: vscode.Webview) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ColorSpace</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: var(--vscode-font-family);
            font-size: var(--vscode-font-size);
            color: var(--vscode-foreground);
            padding: 16px;
        }

        h2 {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 12px;
            color: var(--vscode-foreground);
        }

        .section {
            margin-bottom: 24px;
        }

        .current-color {
            padding: 12px;
            border-radius: 6px;
            background: var(--vscode-editor-background);
            border: 1px solid var(--vscode-panel-border);
            margin-bottom: 8px;
        }

        .current-color-name {
            font-weight: 600;
            margin-bottom: 4px;
        }

        .current-color-preview {
            display: flex;
            gap: 4px;
            margin-top: 8px;
        }

        .color-box {
            width: 32px;
            height: 32px;
            border-radius: 4px;
            border: 1px solid var(--vscode-panel-border);
        }

        .color-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
            gap: 8px;
        }

        .color-item {
            cursor: pointer;
            padding: 8px;
            border-radius: 6px;
            border: 2px solid transparent;
            background: var(--vscode-editor-background);
            transition: all 0.2s;
        }

        .color-item:hover {
            border-color: var(--vscode-focusBorder);
            transform: translateY(-2px);
        }

        .color-item.active {
            border-color: var(--vscode-focusBorder);
            background: var(--vscode-list-activeSelectionBackground);
        }

        .color-preview {
            width: 100%;
            height: 40px;
            border-radius: 4px;
            margin-bottom: 6px;
            border: 1px solid var(--vscode-panel-border);
        }

        .color-name {
            font-size: 11px;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .custom-color-item {
            position: relative;
        }

        .delete-btn {
            position: absolute;
            top: 4px;
            right: 4px;
            background: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            border-radius: 3px;
            width: 20px;
            height: 20px;
            cursor: pointer;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.2s;
        }

        .custom-color-item:hover .delete-btn {
            opacity: 1;
        }

        .delete-btn:hover {
            background: var(--vscode-button-hoverBackground);
        }

        .add-custom-section {
            margin-top: 12px;
            padding: 12px;
            background: var(--vscode-editor-background);
            border-radius: 6px;
            border: 1px solid var(--vscode-panel-border);
        }

        .form-group {
            margin-bottom: 12px;
        }

        label {
            display: block;
            font-size: 12px;
            margin-bottom: 4px;
            color: var(--vscode-foreground);
        }

        input[type="text"],
        input[type="color"] {
            width: 100%;
            padding: 6px 8px;
            background: var(--vscode-input-background);
            color: var(--vscode-input-foreground);
            border: 1px solid var(--vscode-input-border);
            border-radius: 4px;
            font-family: var(--vscode-font-family);
            font-size: var(--vscode-font-size);
        }

        input[type="color"] {
            height: 36px;
            cursor: pointer;
        }

        button {
            width: 100%;
            padding: 8px 12px;
            background: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-family: var(--vscode-font-family);
            font-size: var(--vscode-font-size);
            font-weight: 500;
        }

        button:hover {
            background: var(--vscode-button-hoverBackground);
        }

        .reset-btn {
            background: var(--vscode-button-secondaryBackground);
            color: var(--vscode-button-secondaryForeground);
            margin-top: 8px;
        }

        .reset-btn:hover {
            background: var(--vscode-button-secondaryHoverBackground);
        }

        .empty-state {
            text-align: center;
            padding: 20px;
            color: var(--vscode-descriptionForeground);
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="section">
        <h2>Current Color</h2>
        <div id="currentColor" class="current-color">
            <div class="empty-state">No color applied</div>
        </div>
        <button class="reset-btn" onclick="resetColor()">Reset Color</button>
    </div>

    <div class="section">
        <h2>Fixed Colors</h2>
        <div id="fixedColors" class="color-grid"></div>
    </div>

    <div class="section">
        <h2>Custom Colors</h2>
        <div id="customColors" class="color-grid"></div>
        
        <div class="add-custom-section">
            <h3 style="font-size: 12px; margin-bottom: 8px;">Add Custom Color</h3>
            <div class="form-group">
                <label for="colorName">Color Name</label>
                <input type="text" id="colorName" placeholder="My Custom Color">
            </div>
            <div class="form-group">
                <label for="activityBarBg">Activity Bar Background</label>
                <input type="color" id="activityBarBg" value="#1e3a5f">
            </div>
            <div class="form-group">
                <label for="sideBarBg">Side Bar Background</label>
                <input type="color" id="sideBarBg" value="#243a52">
            </div>
            <button onclick="addCustomColor()">Add Custom Color</button>
        </div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();
        let currentData = null;

        // Request initial data
        vscode.postMessage({ type: 'requestData' });

        // Handle messages from extension
        window.addEventListener('message', event => {
            const message = event.data;
            if (message.type === 'updateData') {
                currentData = message.data;
                render();
            }
        });

        function render() {
            if (!currentData) return;

            // Render current color
            const currentColorEl = document.getElementById('currentColor');
            if (currentData.currentColor) {
                const color = currentData.currentColor;
                currentColorEl.innerHTML = \`
                    <div class="current-color-name">\${color.name}</div>
                    <div class="current-color-preview">
                        <div class="color-box" style="background: \${color.activityBar.background}" title="Activity Bar"></div>
                        <div class="color-box" style="background: \${color.sideBar.background}" title="Side Bar"></div>
                    </div>
                \`;
            } else {
                currentColorEl.innerHTML = '<div class="empty-state">No color applied</div>';
            }

            // Render fixed colors
            const fixedColorsEl = document.getElementById('fixedColors');
            fixedColorsEl.innerHTML = currentData.fixedColors.map((color, index) => \`
                <div class="color-item \${isCurrentColor(color) ? 'active' : ''}" onclick="applyColor(\${index}, 'fixed')">
                    <div class="color-preview" style="background: \${color.activityBar.background}"></div>
                    <div class="color-name">\${color.name}</div>
                </div>
            \`).join('');

            // Render custom colors
            const customColorsEl = document.getElementById('customColors');
            if (currentData.customColors.length === 0) {
                customColorsEl.innerHTML = '<div class="empty-state">No custom colors yet</div>';
            } else {
                customColorsEl.innerHTML = currentData.customColors.map((color, index) => \`
                    <div class="color-item custom-color-item \${isCurrentColor(color) ? 'active' : ''}" onclick="applyColor(\${index}, 'custom')">
                        <button class="delete-btn" onclick="event.stopPropagation(); deleteCustomColor(\${index})" title="Delete">×</button>
                        <div class="color-preview" style="background: \${color.activityBar.background}"></div>
                        <div class="color-name">\${color.name}</div>
                    </div>
                \`).join('');
            }
        }

        function isCurrentColor(color) {
            if (!currentData.currentColor) return false;
            return currentData.currentColor.name === color.name &&
                   currentData.currentColor.activityBar.background === color.activityBar.background;
        }

        function applyColor(index, type) {
            const color = type === 'fixed' ? currentData.fixedColors[index] : currentData.customColors[index];
            vscode.postMessage({ type: 'applyColor', color });
        }

        function addCustomColor() {
            const name = document.getElementById('colorName').value.trim();
            const activityBarBg = document.getElementById('activityBarBg').value;
            const sideBarBg = document.getElementById('sideBarBg').value;

            if (!name) {
                alert('Please enter a color name');
                return;
            }

            const color = {
                name: name,
                activityBar: {
                    background: activityBarBg,
                    foreground: '#ffffff',
                    inactiveForeground: '#a0a0a0'
                },
                sideBar: {
                    background: sideBarBg,
                    foreground: '#e0e0e0'
                },
                sideBarTitle: {
                    foreground: '#ffffff'
                },
                statusBar: {
                    background: activityBarBg,
                    foreground: '#ffffff'
                }
            };

            vscode.postMessage({ type: 'addCustomColor', color });

            // Clear form
            document.getElementById('colorName').value = '';
            document.getElementById('activityBarBg').value = '#1e3a5f';
            document.getElementById('sideBarBg').value = '#243a52';
        }

        function deleteCustomColor(index) {
            if (confirm('Delete this custom color?')) {
                vscode.postMessage({ type: 'deleteCustomColor', index });
            }
        }

        function resetColor() {
            if (confirm('Reset workspace color to default?')) {
                vscode.postMessage({ type: 'resetColor' });
            }
        }
    </script>
</body>
</html>`;
    }
}
