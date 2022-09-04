import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  CircularProgress,
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
// import { useEffect } from "react";
// import { connectAuthEmulator, getAuth } from "firebase/auth";
// import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
// import { connectDatabaseEmulator, getDatabase } from "firebase/database";

export default function App({ Component, pageProps }: AppProps) {

  const theme = responsiveFontSizes(
    createTheme({
      palette: {
        mode: "dark",
      },
    })
  );

  // useEffect(() => {
  //   if (window.location.hostname === "localhost") {
  //     connectAuthEmulator(getAuth(), "http://localhost:9099");
  //     connectFunctionsEmulator(getFunctions(), "localhost", 5001);
  //     connectDatabaseEmulator(getDatabase(), "localhost", 9000);
  //   }
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Component {...pageProps} />
      </CssBaseline>
    </ThemeProvider>
  );
}