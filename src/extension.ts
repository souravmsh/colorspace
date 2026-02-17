import * as vscode from 'vscode';
import { ColorManager } from './colorManager';
import { ColorSpacePanel } from './panel/ColorSpacePanel';

let colorManager: ColorManager;
let colorSpacePanel: ColorSpacePanel;

/**
 * Extension activation
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('ColorSpace is now active');

    // Initialize color manager
    colorManager = new ColorManager();

    // Initialize and register ColorSpace panel
    colorSpacePanel = new ColorSpacePanel(context.extensionUri, colorManager);

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            ColorSpacePanel.viewType,
            colorSpacePanel
        )
    );

    // Auto-assign color on startup
    colorManager.autoAssignColor();

    // Register command: Change Workspace Color
    const changeColorCommand = vscode.commands.registerCommand('colorspace.changeColor', async () => {
        await colorManager.showColorPicker();
        await colorSpacePanel.refresh();
    });

    // Register command: Reset Workspace Color
    const resetColorCommand = vscode.commands.registerCommand('colorspace.resetColor', async () => {
        await colorManager.resetColor();
        await colorSpacePanel.refresh();
    });

    // Register command: Pick Random Color
    const randomColorCommand = vscode.commands.registerCommand('colorspace.randomColor', async () => {
        await colorManager.pickRandomColor();
        await colorSpacePanel.refresh();
    });

    // Register command: Add Custom Color
    const addCustomColorCommand = vscode.commands.registerCommand('colorspace.addCustomColor', async () => {
        const name = await vscode.window.showInputBox({
            prompt: 'Enter a name for your custom color',
            placeHolder: 'My Custom Color'
        });

        if (!name) {
            return;
        }

        const activityBarBg = await vscode.window.showInputBox({
            prompt: 'Enter Activity Bar background color (hex)',
            placeHolder: '#1e3a5f',
            value: '#1e3a5f'
        });

        if (!activityBarBg) {
            return;
        }

        const sideBarBg = await vscode.window.showInputBox({
            prompt: 'Enter Side Bar background color (hex)',
            placeHolder: '#243a52',
            value: '#243a52'
        });

        if (!sideBarBg) {
            return;
        }

        const customColor = {
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

        await colorManager.addCustomColor(customColor);
        await colorSpacePanel.refresh();
    });

    // Add commands to subscriptions
    context.subscriptions.push(changeColorCommand);
    context.subscriptions.push(resetColorCommand);
    context.subscriptions.push(randomColorCommand);
    context.subscriptions.push(addCustomColorCommand);

    // Watch for workspace folder changes
    const workspaceFoldersChangeListener = vscode.workspace.onDidChangeWorkspaceFolders(async () => {
        await colorManager.autoAssignColor();
        await colorSpacePanel.refresh();
    });

    context.subscriptions.push(workspaceFoldersChangeListener);
}

/**
 * Extension deactivation
 */
export function deactivate() {
    console.log('ColorSpace is now deactivated');
}
