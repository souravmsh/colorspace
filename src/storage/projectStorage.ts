import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { WorkspaceColorScheme } from '../colors';

export interface ColorSpaceConfig {
    currentColor?: WorkspaceColorScheme;
    customColors: WorkspaceColorScheme[];
}

/**
 * Manages project-level color storage in .vscode/colorspace.json
 */
export class ProjectStorage {
    private configPath: string | undefined;
    private readonly CONFIG_FILE = 'colorspace.json';
    private readonly VSCODE_DIR = '.vscode';

    constructor() {
        this.updateConfigPath();
    }

    /**
     * Update the config path based on current workspace
     */
    private updateConfigPath(): void {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (workspaceFolder) {
            const vscodeDir = path.join(workspaceFolder.uri.fsPath, this.VSCODE_DIR);
            this.configPath = path.join(vscodeDir, this.CONFIG_FILE);
        } else {
            this.configPath = undefined;
        }
    }

    /**
     * Ensure .vscode directory exists
     */
    private async ensureVscodeDir(): Promise<void> {
        if (!this.configPath) {
            throw new Error('No workspace folder is open');
        }

        const vscodeDir = path.dirname(this.configPath);

        try {
            await fs.promises.access(vscodeDir);
        } catch {
            // Directory doesn't exist, create it
            await fs.promises.mkdir(vscodeDir, { recursive: true });
        }
    }

    /**
     * Read the color configuration from the project
     */
    public async readConfig(): Promise<ColorSpaceConfig> {
        this.updateConfigPath();

        if (!this.configPath) {
            return { customColors: [] };
        }

        try {
            const content = await fs.promises.readFile(this.configPath, 'utf-8');
            const config = JSON.parse(content) as ColorSpaceConfig;

            // Ensure customColors array exists
            if (!config.customColors) {
                config.customColors = [];
            }

            return config;
        } catch (error) {
            // File doesn't exist or is invalid, return default config
            return { customColors: [] };
        }
    }

    /**
     * Write the color configuration to the project
     */
    public async writeConfig(config: ColorSpaceConfig): Promise<void> {
        this.updateConfigPath();

        if (!this.configPath) {
            throw new Error('No workspace folder is open');
        }

        await this.ensureVscodeDir();

        const content = JSON.stringify(config, null, 2);
        await fs.promises.writeFile(this.configPath, content, 'utf-8');
    }

    /**
     * Get the current workspace color
     */
    public async getCurrentColor(): Promise<WorkspaceColorScheme | undefined> {
        const config = await this.readConfig();
        return config.currentColor;
    }

    /**
     * Set the current workspace color
     */
    public async setCurrentColor(color: WorkspaceColorScheme): Promise<void> {
        const config = await this.readConfig();
        config.currentColor = color;
        await this.writeConfig(config);
    }

    /**
     * Get all custom colors
     */
    public async getCustomColors(): Promise<WorkspaceColorScheme[]> {
        const config = await this.readConfig();
        return config.customColors || [];
    }

    /**
     * Add a custom color
     */
    public async addCustomColor(color: WorkspaceColorScheme): Promise<void> {
        const config = await this.readConfig();

        if (!config.customColors) {
            config.customColors = [];
        }

        config.customColors.push(color);
        await this.writeConfig(config);
    }

    /**
     * Update a custom color by index
     */
    public async updateCustomColor(index: number, color: WorkspaceColorScheme): Promise<void> {
        const config = await this.readConfig();

        if (!config.customColors || index < 0 || index >= config.customColors.length) {
            throw new Error('Invalid custom color index');
        }

        config.customColors[index] = color;
        await this.writeConfig(config);
    }

    /**
     * Delete a custom color by index
     */
    public async deleteCustomColor(index: number): Promise<void> {
        const config = await this.readConfig();

        if (!config.customColors || index < 0 || index >= config.customColors.length) {
            throw new Error('Invalid custom color index');
        }

        config.customColors.splice(index, 1);
        await this.writeConfig(config);
    }

    /**
     * Reset all colors (delete the config file)
     */
    public async reset(): Promise<void> {
        this.updateConfigPath();

        if (!this.configPath) {
            return;
        }

        try {
            await fs.promises.unlink(this.configPath);
        } catch {
            // File doesn't exist, nothing to do
        }
    }

    /**
     * Check if workspace has a saved configuration
     */
    public async hasConfig(): Promise<boolean> {
        this.updateConfigPath();

        if (!this.configPath) {
            return false;
        }

        try {
            await fs.promises.access(this.configPath);
            return true;
        } catch {
            return false;
        }
    }
}
