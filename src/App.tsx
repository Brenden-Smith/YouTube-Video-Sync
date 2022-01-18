// Components
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router";
import { ThemeProvider } from "@mui/material/styles";
import { PrivateRoute } from "./components";
import { initializeApp } from "firebase/app";
import {
  getToken,
  initializeAppCheck,
  ReCaptchaV3Provider,
} from "firebase/app-check";
import { FirebaseConfig, RecaptchaConfig } from "./firebase/secret_keys";
import CreateAppTheme from "./theme";

// Routes
import { Home, Login, Room } from "./routes";
import { CssBaseline } from "@mui/material";

export default function App() {
  const [mounted, setMounted] = useState(false);
  const theme = CreateAppTheme();

  // Asynchronous loading of resources
  useEffect(() => {
    const app = initializeApp(FirebaseConfig);
    const appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(RecaptchaConfig),
      isTokenAutoRefreshEnabled: true,
    });

    getToken(appCheck)
      .then(() => {
        console.log("Firebase authenticated & initialized");
      })
      .catch((error) => {
        console.log(error);
      });
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/room/:id" element={<PrivateRoute />}>
                  <Route path="/room/:id" element={<Room />} />
                </Route>
                <Route path="/login" element={<Login />} />
              </Routes>
            </Router>
          </CssBaseline>
        </ThemeProvider>
      )}
    </>
  );
}
