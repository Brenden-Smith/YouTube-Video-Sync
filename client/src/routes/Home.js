import React, { useState } from "react";

// Material UI
import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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
}));

const Home = () => {

    const classes = useStyles();
    const history = useHistory();

    function handleClick() {
        var room = Math.random().toString(36).substr(2, 6);
        history.push("/room/", "Video Sync", room);
  }

  return (
    <Grid className={classes.root}>
      <Grid item align="center">
        <Paper className={classes.window}>
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
            </Grid>
            <Grid item>
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

export default Home;
