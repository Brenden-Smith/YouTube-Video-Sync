import React from "react"

// Material UI
import { Button, Grid, Paper, Typography, Theme, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/styles";

/**
 * Styles for the home screen
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
 * Landing screen for the application
 */
export default function Home() {

  const classes = useStyles(useTheme())
  const navigate = useNavigate();

  function handleClick() {
    let randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = '';
    for (let i = 0; i < 6; i++) {
      id += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    navigate(`/room/${id}`, { replace: true });
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
            <Grid item>
              <Typography align="center" variant="h3">
                Video Sync
              </Typography>
              <Typography align="center" variant="body1">
                Visit my website:{" "}
                <Link href="https://brenden-smith.com" target="_blank">
                  brenden-smith.com
                </Link>
              </Typography>
              <Typography align="center" variant="body1">
                An application created with React, NodeJS, and
                Firebase
              </Typography>
            </Grid>
            <Grid item sx={{ textAlign: "center" }}>
              <Button variant="contained" onClick={handleClick}>
                Create a room
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
