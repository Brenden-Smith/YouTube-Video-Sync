import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export default function Theme() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = responsiveFontSizes(
    React.useMemo(
      () =>
        createTheme({
          palette: {
            type: prefersDarkMode ? "dark" : "light",
          },
        }),
      [prefersDarkMode]
    )
  );
  return theme;
}
