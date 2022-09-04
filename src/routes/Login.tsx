import { useState } from "react";
// Assets
import GoogleLogo from "../assets/icons/GoogleLogo";

// Components
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  Theme,
} from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useTheme } from "@mui/styles";
import { auth } from "../firebase/firebase";

/**
 * Styling for the login screen
 */
const useStyles = (theme: Theme) => ({
  root: {
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
  },
  window: {
    height: "250px",
    width: "500px",
  },
});

/**
 * Login screen
 */
export default function Login() {
  const [loading, setLoading] = useState(false);
  const classes = useStyles(useTheme());

  async function handleLogin() {
    setLoading(true);
    await signInWithPopup(auth, new GoogleAuthProvider())
  }

  return (
    <Grid container sx={classes.root}>
      <Grid item alignItems="center">
        <Paper sx={classes.window}>
          <Grid
            container
            direction="column"
            justifyContent="space-evenly"
            style={{ height: "100%" }}
          >
            <Grid item sx={{ textAlign: "center" }}>
              <Typography align="center" variant="h3">
                Login
              </Typography>
            </Grid>
            <Grid item sx={{ textAlign: "center" }}>
              {loading ? (
                <CircularProgress color="primary" />
              ) : (
                <Button
                  variant="contained"
                  startIcon={<GoogleLogo />}
                  onClick={() => handleLogin()}
                >
                  Login with Google
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
