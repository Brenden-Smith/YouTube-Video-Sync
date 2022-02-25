// Components
import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router";
import { ThemeProvider } from "@mui/material/styles";
import { PrivateRoute } from "./components";
import CreateAppTheme from "./assets/theme";

// Routes
import { Home, Login, Room } from "./routes";
import { CssBaseline } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const theme = CreateAppTheme();

  // Determine current authentication state
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user);
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
                <Route
                  path="/room/:id"
                  element={<PrivateRoute auth={authenticated} />}
                >
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
