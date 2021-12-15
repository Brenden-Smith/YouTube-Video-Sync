import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Box, Button, Container, Grid, Paper, Tab } from "@material-ui/core";
import {
  NavBar,
  CommentFeed,
  QueueFeed,
  VideoPlayer,
  VideoDetails,
} from "../components";
import { Video } from "../models";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import "../index.css";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100vh",
  },
  grid: {
    height: 'calc(100% - 64px)'
  },
  infoContainer: {
    height: "75vh",
    minWidth: "300px",
  },
  info: {
    height: "100%",
    width: "100%",
    overflow: "auto",
  },
  tab: {
    minWidth: 50,
  },
});

const testVideo = new Video({
  creator: "Tom Scott",
  creator_photo:
    "https://yt3.ggpht.com/ytc/AKedOLTn7ljFVHlZoPxxekAfuIzfhFPKhBblpYYHhaR4pQ=s88-c-k-c0x00ffffff-no-rj",
  src: "https://www.youtube.com/embed/LZM9YdO_QKk",
  title: "The Consequences of Your Code",
});

export default withStyles(styles, { withTheme: true })(
  class Room extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        tab: "1",
      };
    }

    handleChange = (event, newValue) => {
      this.setState({ tab: newValue });
    };

    render() {
      const { classes, theme } = this.props;
      return (
        <div id="room" className={classes.root}>
          <NavBar />
          <Grid
            className={classes.grid}
            container
            alignItems="center"
            justify="space-evenly"
          >
            {/* Video  */}

            <Grid item xs={12} md={8}>
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

            {/* Information Widget */}

            <Grid item xs={12} md={3}>
              <Paper className={classes.infoContainer}>
                <TabContext value={this.state.tab}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      centered={true}
                      value={this.state.tab}
                      onChange={this.handleChange}
                      aria-label="Information tabs"
                      textColor="secondary"
                      variant="fullWidth"
                    >
                      <Tab className={classes.tab} label="Chat" value="1" />
                      <Tab className={classes.tab} label="Comments" value="2" />
                      <Tab className={classes.tab} label="Queue" value="3" />
                    </TabList>
                  </Box>
                  <Paper className={classes.info}>
                    <TabPanel value="1">Chat</TabPanel>
                    <TabPanel value="2">
                      <CommentFeed />
                    </TabPanel>
                    <TabPanel value="3">
                      <QueueFeed />
                    </TabPanel>
                  </Paper>
                </TabContext>
              </Paper>
            </Grid>
          </Grid>
        </div>
      );
    }
  }
);
