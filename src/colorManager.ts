import * as vscode from 'vscode';
import { FIXED_COLOR_PALETTE, WorkspaceColorScheme } from './colors';
import { ProjectStorage } from './storage/projectStorage';

/**
 * Manages workspace color assignments and application
 */
export class ColorManager {
    private storage: ProjectStorage;

    constructor() {
        this.storage = new ProjectStorage();
    }

    /**
     * Get the color scheme assigned to the current workspace
     */
    public async getWorkspaceColor(): Promise<WorkspaceColorScheme | undefined> {
        return await this.storage.getCurrentColor();
    }

    /**
     * Get all available colors (fixed + custom)
     */
    public async getAllColors(): Promise<{ fixed: WorkspaceColorScheme[]; custom: WorkspaceColorScheme[] }> {
        const customColors = await this.storage.getCustomColors();
        return {
            fixed: FIXED_COLOR_PALETTE,
            custom: customColors
        };
    }

    /**
     * Apply a color to the current workspace
     */
    public async setWorkspaceColor(color: WorkspaceColorScheme): Promise<void> {
        if (!vscode.workspace.workspaceFolders?.[0]) {
            vscode.window.showErrorMessage('No workspace folder is open');
            return;
        }

        // Save to project storage
        await this.storage.setCurrentColor(color);

        // Apply the color
        await this.applyColor(color);

        vscode.window.showInformationMessage(`Workspace color set to: ${color.name}`);
    }

    /**
     * Automatically assign a color to the current workspace if not already assigned
     */
    public async autoAssignColor(): Promise<void> {
        const config = vscode.workspace.getConfiguration('colorspace');
        const autoColor = config.get<boolean>('autoColor', true);

        if (!autoColor) {
            return;
        }

        const existingColor = await this.getWorkspaceColor();
        if (existingColor) {
            // Already has a color, just apply it
            await this.applyColor(existingColor);
            return;
        }

        // Assign a random color from the fixed palette
        const randomIndex = Math.floor(Math.random() * FIXED_COLOR_PALETTE.length);
        await this.setWorkspaceColor(FIXED_COLOR_PALETTE[randomIndex]);
    }

    /**
     * Apply a color scheme to the workspace settings
     */
    private async applyColor(colorScheme: WorkspaceColorScheme): Promise<void> {
        const config = vscode.workspace.getConfiguration('colorspace');
        const colorElements = config.get<any>('colorElements', {
            activityBar: true,
            sideBar: true,
            statusBar: false
        });

        const workbenchConfig = vscode.workspace.getConfiguration('workbench');
        const currentCustomizations = workbenchConfig.get<any>('colorCustomizations', {});

        const newCustomizations: any = { ...currentCustomizations };

        // Apply Activity Bar colors
        if (colorElements.activityBar) {
            newCustomizations['activityBar.background'] = colorScheme.activityBar.background;
            newCustomizations['activityBar.foreground'] = colorScheme.activityBar.foreground;
            newCustomizations['activityBar.inactiveForeground'] = colorScheme.activityBar.inactiveForeground;
        }

        // Apply Side Bar colors
        if (colorElements.sideBar) {
            newCustomizations['sideBar.background'] = colorScheme.sideBar.background;
            newCustomizations['sideBar.foreground'] = colorScheme.sideBar.foreground;
            newCustomizations['sideBarTitle.foreground'] = colorScheme.sideBarTitle.foreground;
        }

        // Apply Status Bar colors (optional)
        if (colorElements.statusBar && colorScheme.statusBar) {
            newCustomizations['statusBar.background'] = colorScheme.statusBar.background;
            newCustomizations['statusBar.foreground'] = colorScheme.statusBar.foreground;
            newCustomizations['statusBar.noFolderBackground'] = colorScheme.statusBar.background;
        }

        await workbenchConfig.update('colorCustomizations', newCustomizations, vscode.ConfigurationTarget.Workspace);
    }

    /**
     * Reset the workspace color to default
     */
    public async resetColor(): Promise<void> {
        if (!vscode.workspace.workspaceFolders?.[0]) {
            vscode.window.showErrorMessage('No workspace folder is open');
            return;
        }

        // Remove from project storage
        await this.storage.reset();

        // Remove color customizations
        const workbenchConfig = vscode.workspace.getConfiguration('workbench');
        const currentCustomizations = workbenchConfig.get<any>('colorCustomizations', {});

        const keysToRemove = [
            'activityBar.background',
            'activityBar.foreground',
            'activityBar.inactiveForeground',
            'sideBar.background',
            'sideBar.foreground',
            'sideBarTitle.foreground',
            'statusBar.background',
            'statusBar.foreground',
            'statusBar.noFolderBackground'
        ];

        keysToRemove.forEach(key => {
            delete currentCustomizations[key];
        });

        await workbenchConfig.update('colorCustomizations', currentCustomizations, vscode.ConfigurationTarget.Workspace);

        vscode.window.showInformationMessage('Workspace color reset to default');
    }

    /**
     * Pick a random color from the fixed palette
     */
    public async pickRandomColor(): Promise<void> {
        const randomIndex = Math.floor(Math.random() * FIXED_COLOR_PALETTE.length);
        await this.setWorkspaceColor(FIXED_COLOR_PALETTE[randomIndex]);
    }

    /**
     * Show a quick pick menu to select a color
     */
    public async showColorPicker(): Promise<void> {
        const colors = await this.getAllColors();
        const allColors = [...colors.fixed, ...colors.custom];

        const items = allColors.map((color, index) => ({
            label: color.name,
            description: index < colors.fixed.length ? 'Fixed' : 'Custom',
            detail: color.activityBar.background,
            color: color
        }));

        const selected = await vscode.window.showQuickPick(items, {
            placeHolder: 'Select a color for this workspace'
        });

        if (selected) {
            await this.setWorkspaceColor(selected.color);
        }
    }

    /**
     * Add a custom color
     */
    public async addCustomColor(color: WorkspaceColorScheme): Promise<void> {
        await this.storage.addCustomColor(color);
        vscode.window.showInformationMessage(`Custom color "${color.name}" added`);
    }

    /**
     * Update a custom color
     */
    public async updateCustomColor(index: number, color: WorkspaceColorScheme): Promise<void> {
        await this.storage.updateCustomColor(index, color);
        vscode.window.showInformationMessage(`Custom color "${color.name}" updated`);
    }

    /**
     * Delete a custom color
     */
    public async deleteCustomColor(index: number): Promise<void> {
        const customColors = await this.storage.getCustomColors();
        if (index >= 0 && index < customColors.length) {
            const colorName = customColors[index].name;
            await this.storage.deleteCustomColor(index);
            vscode.window.showInformationMessage(`Custom color "${colorName}" deleted`);
        }
    }
}
