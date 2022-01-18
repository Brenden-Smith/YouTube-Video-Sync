import { PaletteMode } from "@mui/material";

export default interface AppTheme {
    palette: {
        mode: PaletteMode;
        background: {
            appbar: string;
            avatar: string;
            default: string;
            paper: string;
        };
    }
}