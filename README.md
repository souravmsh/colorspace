# ColorSpace :: Unique Workspace Colors for VS Code

A Visual Studio Code extension that automatically assigns different colors to different workspaces, making it easy to visually distinguish between multiple projects. Features a dedicated sidebar panel for managing workspace colors with both preset and custom color schemes.

📖 **[Read the complete User Manual](docs/USER_MANUAL.md)** for detailed instructions and advanced usage.

## ✨ Features

- 🎨 **Sidebar Panel**: Dedicated ColorSpace panel in the Activity Bar for easy color management
- 🔄 **Automatic Color Assignment**: Each workspace gets a unique color automatically when opened
- 💾 **Project-Level Storage**: Colors saved in `.vscode/colorspace.json` (can be version controlled)
- 🌈 **12 Beautiful Presets**: Carefully curated fixed color palette
- 🎯 **Custom Colors**: Create, manage, and delete your own custom color schemes
- 📍 **Left Sidebar Focus**: Colors the Activity Bar and Side Bar for maximum visibility
- ⚙️ **Customizable**: Choose which UI elements to color

## 📦 Installation

### Method 1: Install from VSIX File (Manual Installation)

1. **Download the Extension**:
   - Download `colorspace-1.0.0.vsix` from the releases or build it yourself

2. **Open VS Code**:
   - Launch Visual Studio Code

3. **Open Command Palette**:
   - Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)

4. **Install from VSIX**:
   - Type "Install from VSIX" and select **Extensions: Install from VSIX...**
   - Navigate to the downloaded `colorspace-1.0.0.vsix` file
   - Click "Select Extension" or "Open"

5. **Reload VS Code**:
   - Click "Reload" when prompted to activate the extension
   - Or manually reload: `Ctrl+Shift+P` → "Developer: Reload Window"

6. **Verify Installation**:
   - Look for the ColorSpace icon (4-color grid) in the Activity Bar on the left
   - Click the icon to open the ColorSpace panel

### Method 2: Build from Source

```bash
# Clone the repository
git clone <repository-url>
cd colorspace

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Package the extension
npm run package

# Install the generated .vsix file
# Follow Method 1 steps 3-6 above
```

## 🚀 Quick Start

1. Install the extension
2. Click the ColorSpace icon in the Activity Bar (left sidebar)
3. Select a color from the panel or let it auto-assign
4. Your workspace is now color-coded!

## 📖 Usage

### Sidebar Panel

The ColorSpace panel provides a visual interface for managing workspace colors:

- **Current Color**: Shows the currently applied color with preview
- **Fixed Colors**: 12 preset color schemes ready to use
- **Custom Colors**: Your personally created color schemes
- **Add Custom Color**: Create new colors with custom Activity Bar and Side Bar backgrounds
- **Reset Button**: Remove color customization

### Commands

Access via Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`):

- **ColorSpace: Change Workspace Color** - Quick picker to select a color
- **ColorSpace: Pick Random Color** - Assigns a random color from presets
- **ColorSpace: Reset Workspace Color** - Removes color customization
- **ColorSpace: Add Custom Color** - Create a custom color via input prompts

### Project-Level Storage

Colors are saved in `.vscode/colorspace.json` within your project:

```json
{
  "currentColor": {
    "name": "Ocean Blue",
    "activityBar": { ... },
    "sideBar": { ... }
  },
  "customColors": [...]
}
```

**Benefits:**
- ✅ Colors persist with the project
- ✅ Can be committed to version control
- ✅ Team members see the same colors
- ✅ Each project has independent color configuration

## ⚙️ Configuration

Settings available in VS Code Settings (`Ctrl+,` or `Cmd+,`):

### `colorspace.autoColor`
- **Type**: `boolean`
- **Default**: `true`
- **Description**: Automatically assign colors to new workspaces

### `colorspace.colorElements`
- **Type**: `object`
- **Default**: 
  ```json
  {
    "activityBar": true,
    "sideBar": true,
    "statusBar": false
  }
  ```
- **Description**: Choose which UI elements to color
  - `activityBar`: The vertical bar on the far left with icons
  - `sideBar`: The file explorer and other side panels
  - `statusBar`: The bottom status bar (optional)

## 🎨 Color Palette

### Fixed Colors (12 Presets)

1. **Ocean Blue** - Deep blue tones
2. **Forest Green** - Natural green shades
3. **Deep Purple** - Rich purple hues
4. **Crimson Red** - Bold red tones
5. **Amber Orange** - Warm orange shades
6. **Teal Cyan** - Cool cyan colors
7. **Magenta Pink** - Vibrant pink tones
8. **Indigo Blue** - Classic indigo
9. **Olive Green** - Earthy olive tones
10. **Slate Gray** - Professional gray
11. **Brown Earth** - Warm brown shades
12. **Navy Blue** - Deep navy tones

### Custom Colors

Create unlimited custom colors with:
- Custom name
- Activity Bar background color
- Side Bar background color
- Automatic foreground color generation

## 💡 Tips

- **Multiple Workspaces**: Open different projects in separate VS Code windows to see color coding in action
- **Version Control**: Commit `.vscode/colorspace.json` to share colors with your team
- **Custom Colors**: Use the color picker in the panel for easy custom color creation
- **Status Bar**: Enable status bar coloring for even more visual distinction

## 📋 Requirements

- Visual Studio Code version 1.75.0 or higher

## 🐛 Known Issues

None at this time. Please report issues on the GitHub repository.

## 📝 Release Notes

### 1.0.0

Initial release with:
- Sidebar panel with webview UI
- Automatic workspace color assignment
- 12 distinct preset color schemes
- Custom color creation and management
- Project-level color storage in `.vscode/colorspace.json`
- Configurable UI element coloring
- Command palette integration

## 👨‍💻 Author

**Shohrab Hossain** - sourav.diubd@gmail.com

## 📄 License

MIT License - feel free to use this extension in any way you like.

---

**Enjoy coding with colorful workspaces!** 🎨
