import {
  Grid,
  Paper,
  Typography,
  Theme,
  useTheme,
} from "@mui/material";
import Head from "next/head";
import dynamic from "next/dynamic";
import { SSRLoading } from "../lib/components/SSRLoading";

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
  const classes = useStyles(useTheme());

  const LoginButton = dynamic(() => import("../lib/components/LoginButton").then((mod) => mod.LoginButton), {
    ssr: false,
    loading: SSRLoading
  });

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
                  <LoginButton />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}
