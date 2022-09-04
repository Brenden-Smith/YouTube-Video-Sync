import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  CircularProgress,
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import { AppContext, AppProvider } from "../lib/context/app";
import { useEffect } from "react";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { connectDatabaseEmulator, getDatabase } from "firebase/database";

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
        <AppProvider>
          <AppContext.Consumer>
            {({ loading }) =>
              loading && (
                <div
                  style={{
                    position: "absolute",
                    width: "100vw",
                    height: "100vh",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    zIndex: 1000000,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <CircularProgress sx={{ color: "white" }} />
                </div>
              )
            }
          </AppContext.Consumer>
          <Component {...pageProps} />
        </AppProvider>
      </CssBaseline>
    </ThemeProvider>
  );
}