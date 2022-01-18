import { useMemo } from 'react';
import { PaletteMode, useMediaQuery } from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

/**
 * Declare custom types for theme
 */
declare module '@mui/material/styles' {
    interface Theme {
      background: {
        appbar: string;
        avatar: string;
        default: string;
        paper: string;
      };
    }
    interface ThemeOptions {
      background?: {
        appbar?: string;
        avatar?: string;
        default?: string;
        paper?: string;
      };
    }
}

/**
 * Determine theme based on user system preferences
 */
const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light' ? {
            background: {
                appbar: "rgba(0, 0, 0, 0.26)",
                avatar: "rgba(0, 0, 0, 0.26)",
                default: "#fafafa",
                paper: "rgba(0, 0, 0, 0.26)",
            },
        } : {
            background: {
                appbar: "#303030",
                avatar: "#757575",
                default: "#424242",
                paper: "#303030"
            },
        })
    }
})

/**
 * Creates a global theme instance for the application
 */
export default function CreateAppTheme() {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    return responsiveFontSizes(useMemo(() => createTheme(getDesignTokens(prefersDarkMode ? "dark" : "light")),
        [prefersDarkMode]
      )
    );
}