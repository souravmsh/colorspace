/**
 * Color palette for workspace customization
 * Each color includes settings for Activity Bar, Side Bar, and Status Bar
 */

export interface WorkspaceColorScheme {
    name: string;
    activityBar: {
        background: string;
        foreground: string;
        inactiveForeground: string;
    };
    sideBar: {
        background: string;
        foreground: string;
    };
    sideBarTitle: {
        foreground: string;
    };
    statusBar?: {
        background: string;
        foreground: string;
    };
}

export const FIXED_COLOR_PALETTE: WorkspaceColorScheme[] = [
    {
        name: "Ocean Blue",
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
        },
        statusBar: {
            background: "#1e3a5f",
            foreground: "#ffffff"
        }
    },
    {
        name: "Forest Green",
        activityBar: {
            background: "#2d5016",
            foreground: "#ffffff",
            inactiveForeground: "#a8c99c"
        },
        sideBar: {
            background: "#344d20",
            foreground: "#e0e0e0"
        },
        sideBarTitle: {
            foreground: "#ffffff"
        },
        statusBar: {
            background: "#2d5016",
            foreground: "#ffffff"
        }
    },
    {
        name: "Deep Purple",
        activityBar: {
            background: "#4a148c",
            foreground: "#ffffff",
            inactiveForeground: "#c5a3e0"
        },
        sideBar: {
            background: "#5e1d9e",
            foreground: "#e0e0e0"
        },
        sideBarTitle: {
            foreground: "#ffffff"
        },
        statusBar: {
            background: "#4a148c",
            foreground: "#ffffff"
        }
    },
    {
        name: "Crimson Red",
        activityBar: {
            background: "#7f1d1d",
            foreground: "#ffffff",
            inactiveForeground: "#f5b5b5"
        },
        sideBar: {
            background: "#8f2626",
            foreground: "#e0e0e0"
        },
        sideBarTitle: {
            foreground: "#ffffff"
        },
        statusBar: {
            background: "#7f1d1d",
            foreground: "#ffffff"
        }
    },
    {
        name: "Amber Orange",
        activityBar: {
            background: "#b45309",
            foreground: "#ffffff",
            inactiveForeground: "#ffd699"
        },
        sideBar: {
            background: "#c76110",
            foreground: "#e0e0e0"
        },
        sideBarTitle: {
            foreground: "#ffffff"
        },
        statusBar: {
            background: "#b45309",
            foreground: "#ffffff"
        }
    },
    {
        name: "Teal Cyan",
        activityBar: {
            background: "#0f5e5e",
            foreground: "#ffffff",
            inactiveForeground: "#a0d4d4"
        },
        sideBar: {
            background: "#166e6e",
            foreground: "#e0e0e0"
        },
        sideBarTitle: {
            foreground: "#ffffff"
        },
        statusBar: {
            background: "#0f5e5e",
            foreground: "#ffffff"
        }
    },
    {
        name: "Magenta Pink",
        activityBar: {
            background: "#831843",
            foreground: "#ffffff",
            inactiveForeground: "#f5a3c7"
        },
        sideBar: {
            background: "#9d1f50",
            foreground: "#e0e0e0"
        },
        sideBarTitle: {
            foreground: "#ffffff"
        },
        statusBar: {
            background: "#831843",
            foreground: "#ffffff"
        }
    },
    {
        name: "Indigo Blue",
        activityBar: {
            background: "#1e3a8a",
            foreground: "#ffffff",
            inactiveForeground: "#a5b4d4"
        },
        sideBar: {
            background: "#2847a0",
            foreground: "#e0e0e0"
        },
        sideBarTitle: {
            foreground: "#ffffff"
        },
        statusBar: {
            background: "#1e3a8a",
            foreground: "#ffffff"
        }
    },
    {
        name: "Olive Green",
        activityBar: {
            background: "#4d5e1f",
            foreground: "#ffffff",
            inactiveForeground: "#c9d4a0"
        },
        sideBar: {
            background: "#5a6e26",
            foreground: "#e0e0e0"
        },
        sideBarTitle: {
            foreground: "#ffffff"
        },
        statusBar: {
            background: "#4d5e1f",
            foreground: "#ffffff"
        }
    },
    {
        name: "Slate Gray",
        activityBar: {
            background: "#334155",
            foreground: "#ffffff",
            inactiveForeground: "#b0b8c4"
        },
        sideBar: {
            background: "#3e4f63",
            foreground: "#e0e0e0"
        },
        sideBarTitle: {
            foreground: "#ffffff"
        },
        statusBar: {
            background: "#334155",
            foreground: "#ffffff"
        }
    },
    {
        name: "Brown Earth",
        activityBar: {
            background: "#5d3a1a",
            foreground: "#ffffff",
            inactiveForeground: "#d4b89c"
        },
        sideBar: {
            background: "#6e4520",
            foreground: "#e0e0e0"
        },
        sideBarTitle: {
            foreground: "#ffffff"
        },
        statusBar: {
            background: "#5d3a1a",
            foreground: "#ffffff"
        }
    },
    {
        name: "Navy Blue",
        activityBar: {
            background: "#172554",
            foreground: "#ffffff",
            inactiveForeground: "#9ca8d4"
        },
        sideBar: {
            background: "#1e3163",
            foreground: "#e0e0e0"
        },
        sideBarTitle: {
            foreground: "#ffffff"
        },
        statusBar: {
            background: "#172554",
            foreground: "#ffffff"
        }
    }
];
