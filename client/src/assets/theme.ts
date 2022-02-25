import { PaletteOptions } from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

/**
 * Declare custom types for theme
 */
declare module '@mui/material/styles' {
  interface PaletteColor {
    background?: {
      appbar?: string;
      avatar?: string;
      default?: string;
      paper?: string;
    };
  }
}

/**
 * Creates a global theme instance for the application
 */
export default function CreateAppTheme() {
  return responsiveFontSizes(createTheme({
    palette: {
      mode: "dark",
      background: {
        appbar: "#303030",
        avatar: "#757575",
        default: "#424242",
        paper: "#303030",
      }
    } as PaletteOptions,
  }));
}