// Components
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes }  from "react-router";
import { ThemeProvider } from "@mui/material/styles";
import { PrivateRoute } from "./components";
import { initializeApp } from "firebase/app"
import FirebaseConfig from "./firebase/firebase-config.json"
import CreateAppTheme from "./theme";

// Routes
import { Home, Login, Room } from "./routes";

export default function App() {
  const [mounted, setMounted] = useState(false);
  const theme = CreateAppTheme();

  // Asynchronous loading of resources
  useEffect(() => {
    initializeApp(FirebaseConfig);
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/room/:id" element={<PrivateRoute />}>
                <Route path="/room/:id" element={<Room/>} />
              </Route>
              <Route path="/login" element={<Login/>} />
            </Routes>
          </Router>
        </ThemeProvider>
      )}
    </>
  );
};

