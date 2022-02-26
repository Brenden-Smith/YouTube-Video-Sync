// Components
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router";
import { ThemeProvider } from "@mui/material/styles";
import { PrivateRoute } from "./components";
import CreateAppTheme from "./assets/theme";

// Routes
import { Home, Login, Room } from "./routes";
import { CssBaseline } from "@mui/material";

export default function App() {
  const theme = CreateAppTheme();

  return (
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
  );
}
