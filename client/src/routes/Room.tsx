import { useState } from "react";
import { Box, Container, Divider, Grid, Paper, Tab, Theme } from "@mui/material";
import {
  CommentFeed,
  QueueFeed,
  VideoPlayer,
  VideoDetails,
  RemoteControl,
  NavBar,
} from "../components";
import { Video } from "../models";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import "../index.css";
import { useTheme } from "@mui/styles";
import { useParams } from "react-router-dom";

const useStyles = (theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    maxHeight: "100vh",
    maxWidth: "100vw",
    overflow: "hidden",
  },
  grid: {
    height: "calc(100vh - 64px)",
  },
  infoContainer: {
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
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

const testVideo: Video = {
  creator: "Tom Scott",
  creatorPhoto:
    "https://yt3.ggpht.com/ytc/AKedOLTn7ljFVHlZoPxxekAfuIzfhFPKhBblpYYHhaR4pQ=s88-c-k-c0x00ffffff-no-rj",
  src: "https://www.youtube.com/embed/LZM9YdO_QKk",
  title: "The Consequences of Your Code",
  thumbnail: "",
};

export default function Room() {
  const [video, setVideo] = useState<Video>(testVideo);
  const [tab, setTab] = useState("1");
  const classes = useStyles(useTheme());
  const { id } = useParams();

  return (
    <div id="room" style={classes.root}>
      <Container
        id="content"
        style={classes.root}
        maxWidth={false}
        disableGutters={true}
      >
        <Grid container justifyItems="space-evenly">
          {/* Video  */}

          <Grid item xs={12} md={9} sx={{ height: "100%" }}>
            <VideoPlayer src={video.src} />
            <div style={{ height: "30px" }} />
            <div style={{ marginRight: "15px", marginLeft: "15px" }}>
              <Grid container direction="row" justifyContent="space-between">
                <Grid item>
                  <VideoDetails
                    title={video.title}
                    creator={video.creator}
                    creatorPhoto={video.creatorPhoto}
                  />
                </Grid>
                <Grid item sx={{ textAlign: "right" }}>
                  <RemoteControl />
                </Grid>
              </Grid>
            </div>
          </Grid>

          {/* Information Widget */}

          <Grid item xs={12} md={3}>
            <NavBar />
            <Divider />
            <Paper sx={classes.infoContainer}>
              <TabContext value={tab}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    centered={true}
                    value={tab}
                    onChange={(event, value) => setTab(value)}
                    aria-label="Information tabs"
                    textColor="primary"
                    variant="fullWidth"
                  >
                    <Tab sx={classes.tab} label="Chat" value="1" />
                    <Tab sx={classes.tab} label="Comments" value="2" />
                    <Tab sx={classes.tab} label="Queue" value="3" />
                  </TabList>
                </Box>
                <Paper sx={classes.info}>
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
      </Container>
    </div>
  );
}
