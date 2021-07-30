import React, { useState } from "react";

// Assets
import GoogleLogo from "../assets/icons/GoogleLogo";

// Components
import { Button, CircularProgress, Container, Grid, makeStyles, Paper, Typography } from "@material-ui/core";

// Firebase
import fb from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";

const auth = fb.auth();

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
  },
  loginWindow: {
    height: "250px",
    width: "500px",
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  async function signInWithGoogle() {
    try {
      setLoading(true);
      const provider = new fb.auth.GoogleAuthProvider();
      await auth.signInWithPopup(provider);
      history.push("/")
    } catch {
      setLoading(false)
      console.log("Failed to log in")
    }
  }

  return (
    <Grid container className={classes.root}>
      <Grid item align="center">
        <Paper className={classes.loginWindow}>
          <Grid container direction="column" justifyContent="space-evenly" style={{height: '100%'}}>
            <Grid item>
              <Typography align="center" variant="h3">
                Login
              </Typography>
            </Grid>
            <Grid item>
              {loading ? (
                <CircularProgress color="primary" />
              ) : (
                <Button
                  variant="contained"
                  startIcon={<GoogleLogo />}
                  onClick={signInWithGoogle}
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
};

export default Login;
