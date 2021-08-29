import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, Container, Divider, Grid } from "@material-ui/core";
import { NavBar, CommentFeed, QueueFeed, VideoPlayer, VideoDetails } from "../components";
import { Video } from '../models';

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
    width: "75%",
  },
});

const testVideo = new Video({
  creator: "Tom Scott",
  creator_photo: "https://yt3.ggpht.com/ytc/AKedOLTn7ljFVHlZoPxxekAfuIzfhFPKhBblpYYHhaR4pQ=s88-c-k-c0x00ffffff-no-rj",
  src: "https://www.youtube.com/embed/LZM9YdO_QKk",
  title: "The Consequences of Your Code"
});

export default withStyles(styles, { withTheme: true })(
  class Room extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
      };
    }

    render() {
      const { classes, theme } = this.props;
      return (
        <div id="room" className={classes.root}>
          <NavBar />
          <Grid
            container
            align="center"
            alignItems="center"
            className={classes.grid}
            justify="center"
            spacing={2}
          >
            {/* Video  */}

            <Grid item xs={0} md={1} />
            <Grid item xs={12} md={6} className={classes.video} align="left">
              <VideoPlayer src={testVideo.src} />
              <div style={{ height: "15px" }} />
              <VideoDetails
                title={testVideo.title}
                creator={testVideo.creator}
                creator_photo={testVideo.creator_photo}
              />
              <div style={{ height: "15px" }} />
              <Button variant="outlined">Skip</Button>
            </Grid>

            <Grid item xs={1} />

            {/* Comments & Queue */}

            <Grid item xs={12} md={3}>
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
            <Grid item xs={1} />
          </Grid>
        </div>
      );
    }
  }
);
