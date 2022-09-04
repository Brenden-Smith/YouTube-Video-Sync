import { useState } from "react";
// Assets
import GoogleLogo from "../lib/assets/icons/GoogleLogo";

// Components
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  Theme,
  useTheme,
} from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useApp } from "../lib/context/app";
import Head from "next/head";
import { useRouter } from "next/router";

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

export default function Login() {
  const { setLoading } = useApp();
  const classes = useStyles(useTheme());
  const router = useRouter();

  console.log(router.query);

  async function handleLogin() {
    setLoading(true);
    const redirect = router.query.redirect === undefined ? "/" : router.query.redirect as string;
    await signInWithPopup(getAuth(), new GoogleAuthProvider())
      .then(() => router.replace(redirect))
      .catch((error) => console.log(error));
    setLoading(false);
  }

  return (
    <div>
      <Head>
        <title>Video Sync | Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="root">
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
                  <Button
                    variant="contained"
                    startIcon={<GoogleLogo />}
                    onClick={() => handleLogin()}
                  >
                    Login with Google
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}
