// Components
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  createTheme,
  responsiveFontSizes,
  useMediaQuery,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { PrivateRoute } from "./components";

// Routes
import { Home, Login, Room } from "./routes";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = responsiveFontSizes(
    React.useMemo(
      () =>
        createTheme({
          palette: {
            type: prefersDarkMode ? "dark" : "light",
            background: {
              appbar: prefersDarkMode ? "#303030" : "rgba(0, 0, 0, 0.26)",
              avatar: prefersDarkMode ? "#757575" : "rgba(0, 0, 0, 0.26)",
              default: prefersDarkMode ? "#424242" : "#fafafa",
              paper: prefersDarkMode ? "#303030" : "rgba(0, 0, 0, 0.26)",
            },
          },
        }),
      [prefersDarkMode]
    )
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/room" exact component={Room} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
