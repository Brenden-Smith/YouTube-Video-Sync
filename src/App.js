import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";

import NavBar from "./components/NavBar";
import CommentFeed from "./components/CommentFeed";
import QueueFeed from "./components/QueueFeed";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100vh",
    width: "100vw",
    maxWidth: "100vw",
    maxHeight: "100vh",
  },
  grid: {
    align: "center",
    height: "100%",
    justify: "center",
    width: "100%",
  },
  infoContainer: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    width: "750px",
    height: "50vh",
  },
  infoGrid: {
    height: "100%",
    width: "100%",
  },
  thumbnail: {
    backgroundColor: "black",
    height: "36px",
    width: "64px",
  },
  video: {
    backgroundColor: "black",
    width: "75%",
    height: "500px",
  },
});

export default withStyles(styles, { withTheme: true })(
  class App extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
      };
    }

    render() {
      const { classes, theme } = this.props;
      return (
        <div id="app" className={classes.root}>
          <NavBar />
          <Grid
            container
            align="center"
            alignItems="center"
            className={classes.grid}
            justify="center"
          >
            <Grid item xs={12} md={7}>
              <Grid item className={classes.video} />
              <div style={{ height: "15px" }} />
              <Grid item align="left" style={{ width: "75%" }} spacing={2}>
                <Grid container direction="row" spacing={2}>
                  <Grid item>
                    <Avatar
                      style={{
                        background: theme.palette.background.avatar,
                        width: theme.spacing(7),
                        height: theme.spacing(7),
                      }}
                    >
                      <Box color="text.primary">T</Box>
                    </Avatar>
                  </Grid>
                  <Grid item direction="column">
                    <Typography variant="h6">
                      <Box color="text.primary" fontWeight="bold">
                        Video Title
                      </Box>
                    </Typography>
                    <Typography variant="body1">
                      <Box color="text.primary">Creator Name</Box>
                    </Typography>
                  </Grid>
                </Grid>
                <div style={{ height: "15px" }} />
                <Grid item align="left">
                  <Button variant="outlined">Skip</Button>
                </Grid>
              </Grid>

              <div style={{ height: "15px" }} />
            </Grid>
            <Grid item xs={12} md={5}>
              <Container className={classes.infoContainer}>
                <Grid
                  container
                  alignItems="center"
                  className={classes.infoGrid}
                >
                  <Grid
                    item
                    xs
                    style={{
                      height: "100%",
                      width: "100%",
                      overflow: "hidden",
                    }}
                    align="center"
                  >
                    <CommentFeed />
                  </Grid>
                  <Divider
                    orientation="vertical"
                    flexItem
                    style={{ color: theme.palette.text.primary }}
                  />
                  <Grid
                    item
                    xs
                    style={{
                      height: "100%",
                      width: "100%",
                      overflow: "hidden",
                    }}
                  >
                    <QueueFeed />
                  </Grid>
                </Grid>
              </Container>
            </Grid>
          </Grid>
        </div>
      );
    }
  }
);
