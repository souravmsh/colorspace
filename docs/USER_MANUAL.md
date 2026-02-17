# ColorSpace - User Manual

Complete guide for using ColorSpace VS Code extension to manage workspace colors.

## Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Using the Sidebar Panel](#using-the-sidebar-panel)
- [Managing Colors](#managing-colors)
- [Command Palette](#command-palette)
- [Configuration](#configuration)
- [Project Storage](#project-storage)
- [Team Collaboration](#team-collaboration)
- [Troubleshooting](#troubleshooting)

## Installation

### Method 1: Install from VSIX File

1. Download the `colorspace-1.0.0.vsix` file
2. Open Visual Studio Code
3. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
4. Type "Install from VSIX" and select **Extensions: Install from VSIX...**
5. Navigate to the downloaded `.vsix` file and select it
6. Click "Reload" when prompted to activate the extension

### Method 2: Install from VS Code Marketplace

*(Coming soon - extension will be published to the marketplace)*

### Verify Installation

After installation, you should see the ColorSpace icon (a 4-color grid) in the Activity Bar on the left side of VS Code.

## Getting Started

### First Time Setup

1. **Open a Workspace/Folder**:
   - File → Open Folder
   - Select your project directory

2. **Open ColorSpace Panel**:
   - Click the ColorSpace icon in the Activity Bar (left sidebar)
   - The panel will open showing available colors

3. **Apply Your First Color**:
   - Click any color from the "Fixed Colors" section
   - Your workspace sidebar will immediately change color
   - The color is automatically saved to your project

### Understanding Auto-Color

By default, ColorSpace automatically assigns a random color to new workspaces when you open them for the first time. You can disable this in settings if you prefer manual color selection.

## Using the Sidebar Panel

### Panel Overview

The ColorSpace panel has four main sections:

#### 1. Current Color Section
- Shows the currently applied color name
- Displays color preview boxes for Activity Bar and Side Bar
- Includes a "Reset Color" button

#### 2. Fixed Colors Section
- Grid of 12 preset color schemes
- Click any color to apply it instantly
- Active color is highlighted with a border

#### 3. Custom Colors Section
- Shows your custom-created colors
- Click to apply
- Hover to reveal delete button (×)
- Shows "No custom colors yet" if empty

#### 4. Add Custom Color Section
- Form to create new custom colors
- Fields:
  - **Color Name**: Enter a descriptive name
  - **Activity Bar Background**: Pick color using color picker
  - **Side Bar Background**: Pick color using color picker
- Click "Add Custom Color" to save

### Applying Colors

**To apply a fixed color:**
1. Open ColorSpace panel
2. Scroll to "Fixed Colors"
3. Click on any color tile
4. Color is applied immediately

**To apply a custom color:**
1. Open ColorSpace panel
2. Scroll to "Custom Colors"
3. Click on your custom color tile
4. Color is applied immediately

### Creating Custom Colors

**Step-by-step:**

1. Open ColorSpace panel
2. Scroll to "Add Custom Color" section
3. Enter a name (e.g., "My Project Theme")
4. Click the Activity Bar color picker
5. Choose your desired color
6. Click the Side Bar color picker
7. Choose your desired color (usually slightly lighter/darker than Activity Bar)
8. Click "Add Custom Color" button
9. Your new color appears in the Custom Colors grid

**Tips for choosing colors:**
- Use darker colors for better contrast
- Side Bar should be slightly different from Activity Bar for depth
- Test readability with white/light text
- Consider your theme (dark/light) when choosing colors

### Deleting Custom Colors

1. Open ColorSpace panel
2. Scroll to "Custom Colors"
3. Hover over the color you want to delete
4. Click the "×" button that appears in the top-right corner
5. Confirm deletion in the dialog
6. Color is removed from the list

### Resetting Colors

**To remove all color customizations:**

1. Open ColorSpace panel
2. Click "Reset Color" button at the top
3. Confirm the action
4. Workspace returns to default theme colors
5. `.vscode/colorspace.json` file is deleted

## Managing Colors

### Fixed Color Palette

ColorSpace includes 12 carefully designed preset colors:

1. **Ocean Blue** - Professional deep blue
2. **Forest Green** - Natural green tones
3. **Deep Purple** - Rich purple hues
4. **Crimson Red** - Bold red accent
5. **Amber Orange** - Warm orange tones
6. **Teal Cyan** - Cool cyan shades
7. **Magenta Pink** - Vibrant pink
8. **Indigo Blue** - Classic indigo
9. **Olive Green** - Earthy olive
10. **Slate Gray** - Neutral gray
11. **Brown Earth** - Warm brown
12. **Navy Blue** - Deep navy

### Custom Colors

**Advantages of custom colors:**
- Match your brand/company colors
- Create project-specific themes
- Fine-tune exact color values
- Unlimited custom colors per project

**Best practices:**
- Use meaningful names (e.g., "Client Brand Blue")
- Keep Activity Bar and Side Bar colors coordinated
- Test visibility with your code theme
- Document color codes for team reference

## Command Palette

Access ColorSpace features via Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`):

### Available Commands

**ColorSpace: Change Workspace Color**
- Opens quick picker with all colors (fixed + custom)
- Shows color name and type (Fixed/Custom)
- Select to apply

**ColorSpace: Pick Random Color**
- Randomly selects from fixed color palette
- Applies immediately
- Useful for quick differentiation

**ColorSpace: Reset Workspace Color**
- Removes all color customizations
- Returns to default theme
- Deletes project color configuration

**ColorSpace: Add Custom Color**
- Alternative to panel interface
- Uses input prompts for:
  - Color name
  - Activity Bar background (hex code)
  - Side Bar background (hex code)
- Adds to custom colors list

## Configuration

### Settings

Access via: File → Preferences → Settings → Search "ColorSpace"

#### `colorspace.autoColor`

**Type:** Boolean  
**Default:** `true`

Automatically assign colors to new workspaces when opened.

```json
{
  "colorspace.autoColor": true
}
```

**When to disable:**
- You prefer manual color selection
- Working with many temporary folders
- Don't want automatic color changes

#### `colorspace.colorElements`

**Type:** Object  
**Default:**
```json
{
  "activityBar": true,
  "sideBar": true,
  "statusBar": false
}
```

Choose which UI elements to color.

**Options:**
- `activityBar`: Left sidebar with icons (recommended: true)
- `sideBar`: File explorer and panels (recommended: true)
- `statusBar`: Bottom status bar (optional: false)

**Example - Color everything:**
```json
{
  "colorspace.colorElements": {
    "activityBar": true,
    "sideBar": true,
    "statusBar": true
  }
}
```

**Example - Only Activity Bar:**
```json
{
  "colorspace.colorElements": {
    "activityBar": true,
    "sideBar": false,
    "statusBar": false
  }
}
```

## Project Storage

### Understanding `.vscode/colorspace.json`

ColorSpace saves colors in your project's `.vscode` directory:

**Location:** `<project-root>/.vscode/colorspace.json`

**Structure:**
```json
{
  "currentColor": {
    "name": "Ocean Blue",
    "activityBar": {
      "background": "#1e3a5f",
      "foreground": "#ffffff",
      "inactiveForeground": "#a0b5cc"
    },
    "sideBar": {
      "background": "#243a52",
      "foreground": "#e0e0e0"
    },
    "sideBarTitle": {
      "foreground": "#ffffff"
    },
    "statusBar": {
      "background": "#1e3a5f",
      "foreground": "#ffffff"
    }
  },
  "customColors": [
    {
      "name": "My Custom Color",
      "activityBar": { ... },
      "sideBar": { ... }
    }
  ]
}
```

### Benefits of Project Storage

✅ **Version Control**: Commit to Git and share with team  
✅ **Portability**: Clone project, get colors automatically  
✅ **Independence**: Each project has its own colors  
✅ **Persistence**: Colors survive VS Code updates  
✅ **Team Sync**: Everyone sees the same colors

### Managing Storage Files

**To commit to version control:**
```bash
git add .vscode/colorspace.json
git commit -m "Add ColorSpace configuration"
git push
```

**To ignore in version control:**
Add to `.gitignore`:
```
.vscode/colorspace.json
```

**To manually edit:**
1. Open `.vscode/colorspace.json` in editor
2. Modify color values (hex codes)
3. Save file
4. Reload VS Code window to apply changes

## Team Collaboration

### Sharing Colors with Team

**Method 1: Version Control (Recommended)**

1. Apply colors to your workspace
2. Commit `.vscode/colorspace.json`:
   ```bash
   git add .vscode/colorspace.json
   git commit -m "Add project color scheme"
   ```
3. Push to repository
4. Team members pull changes
5. Colors apply automatically when they open the project

**Method 2: Manual Sharing**

1. Copy `.vscode/colorspace.json` from your project
2. Share file with team (email, Slack, etc.)
3. Team members place file in their `.vscode` directory
4. Reload VS Code

### Team Best Practices

- **Standardize Colors**: Agree on colors for different project types
- **Document Choices**: Add comments in README about color meanings
- **Custom Colors**: Create custom colors for client/brand colors
- **Consistency**: Use same colors across related projects

### Example Team Workflow

```markdown
# Project Color Convention

- **Production Projects**: Ocean Blue
- **Staging Projects**: Amber Orange
- **Development Projects**: Forest Green
- **Client Projects**: Custom color matching brand
```

## Troubleshooting

### Colors Not Applying

**Problem:** Selected color doesn't change workspace

**Solutions:**
1. Check if workspace folder is open (File → Open Folder)
2. Verify `.vscode` directory has write permissions
3. Reload VS Code window (Ctrl+Shift+P → "Reload Window")
4. Check `colorspace.colorElements` settings

### Panel Not Showing

**Problem:** ColorSpace icon missing or panel won't open

**Solutions:**
1. Verify extension is installed and enabled
2. Check Extensions view (Ctrl+Shift+X) for ColorSpace
3. Reload VS Code window
4. Reinstall extension from VSIX

### Custom Colors Not Saving

**Problem:** Custom colors disappear after restart

**Solutions:**
1. Check `.vscode` directory exists and is writable
2. Verify `.vscode/colorspace.json` file is created
3. Check file permissions
4. Look for errors in Output panel (View → Output → ColorSpace)

### Colors Conflict with Theme

**Problem:** Colors look bad with current theme

**Solutions:**
1. Choose different color scheme
2. Switch VS Code theme (File → Preferences → Color Theme)
3. Disable status bar coloring in settings
4. Create custom color matching your theme

### Git Conflicts

**Problem:** Merge conflicts in `colorspace.json`

**Solutions:**
1. Choose one version (yours or theirs)
2. Manually merge color preferences
3. Delete file and reapply colors
4. Add to `.gitignore` if conflicts are frequent

### Performance Issues

**Problem:** VS Code slow after installing ColorSpace

**Solutions:**
1. This is unlikely - extension is lightweight
2. Check other extensions for conflicts
3. Disable auto-color feature
4. Report issue with details

## Advanced Usage

### Multiple Workspaces

**Working with multiple projects:**

1. Open each project in separate VS Code window
2. Apply different color to each workspace
3. Easily identify which project you're working on
4. Colors persist independently

**Keyboard shortcut workflow:**
- `Ctrl+K Ctrl+O`: Open folder in new window
- `Ctrl+Shift+P`: Open command palette
- Type "ColorSpace" to access commands

### Scripting Custom Colors

**Programmatically create colors:**

Create `.vscode/colorspace.json` with script:

```javascript
// generate-colors.js
const fs = require('fs');
const path = require('path');

const config = {
  currentColor: {
    name: "Generated Color",
    activityBar: {
      background: "#1e3a5f",
      foreground: "#ffffff",
      inactiveForeground: "#a0b5cc"
    },
    sideBar: {
      background: "#243a52",
      foreground: "#e0e0e0"
    },
    sideBarTitle: {
      foreground: "#ffffff"
    }
  },
  customColors: []
};

const vscodeDir = path.join(process.cwd(), '.vscode');
if (!fs.existsSync(vscodeDir)) {
  fs.mkdirSync(vscodeDir);
}

fs.writeFileSync(
  path.join(vscodeDir, 'colorspace.json'),
  JSON.stringify(config, null, 2)
);
```

Run: `node generate-colors.js`

## Support

### Getting Help

- **Issues**: Report bugs or request features on GitHub
- **Email**: sourav.diubd@gmail.com
- **Documentation**: This file and README.md

### Reporting Bugs

Include:
1. VS Code version
2. ColorSpace version
3. Operating system
4. Steps to reproduce
5. Expected vs actual behavior
6. Screenshots if applicable

---

**Author:** Shohrab Hossain (sourav.diubd@gmail.com)  
**License:** MIT  
**Version:** 1.0.0
