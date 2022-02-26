/* eslint-disable no-restricted-globals */
import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  List,
  Hidden,
  Paper,
  Tab,
  Theme,
} from "@mui/material";
import { Card, QueueFeed, VideoPlayer, NavBar } from "../components";
import { CardItem, LocalUser, Video } from "../models";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import "../index.css";
import { useTheme } from "@mui/styles";
import { useParams } from "react-router-dom";
import { getAuth, reload } from "firebase/auth";
import {
  onValue,
  ref,
  orderByChild,
  query,
  off,
  set,
  onDisconnect,
} from "firebase/database";
import ChatRoom from "../components/ChatRoom";
import { auth, db } from "../firebase/firebase";

const useStyles = (theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    position: "relative",
  },
  child: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: "-20px",
    right: "-20px",
    overflow: "scroll",
  } as any,
  grid: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100vh",
  },
  content: {
    height: "100%",
    width: "100%",
  },
  tabPanel: {
    // height: "calc(100% - 90px)",
    height: "calc(100% - 42px)",
  },
});

export default function Room() {
  const [video, setVideo] = useState<Video>({} as Video);
  const [users, setUsers] = useState<Array<LocalUser>>([]);
  const [messages, setMessages] = useState<Array<CardItem>>([]);
  const [tab, setTab] = useState("1");
  const [isMounted, setIsMounted] = useState(false);
  const classes = useStyles(useTheme());
  const { id } = useParams();

  // Back-end loading
  useEffect(() => {
    // Constants
    const currentUser = auth.currentUser?.uid;
    const room = id;

    // Queries
    const userQuery = ref(db, `rooms/${room}/users`);
    const messageQuery = query(
      ref(db, `messages/${room}`),
      orderByChild("serverTimestamp")
    );
    const videoQuery = ref(db, `rooms/${room}/video`);

    const currentUserRef = ref(db, `rooms/${room}/users/${currentUser}`);

    // Disconnect listener
    onDisconnect(currentUserRef).remove();

    // User data listener
    onValue(userQuery, async (snapshot) => {
      if (snapshot.val()) {
        let data: Array<LocalUser> = [];
        snapshot.forEach((user) => {
          data.push({...user.val(), uid: user.key});
        });
        setUsers([...data]);
      }
    });

    // Message data listener
    onValue(messageQuery, (snapshot) => {
      if (snapshot.val()) {
        let data: Array<CardItem> = [];
        snapshot.forEach((message) => {
          data.push(message.val());
        });
        setMessages([...data]);
      }
    });

    // Video data listener
    onValue(videoQuery, (snapshot) => {
      if (snapshot.val()) {
        setVideo(snapshot.val());
      }
    });

    async function initializeRoom() {
      if (auth.currentUser) {
        // Add current user to room
        await set(currentUserRef, {
          displayName: auth.currentUser?.displayName,
          photoURL: auth.currentUser?.photoURL,
          uid: currentUser,
        }).then(() => {
          setIsMounted(true);
        });
        await set(ref(db, `rooms/${room}/video/action`), "set");
      }
    }

    initializeRoom();

    return () => {
      off(userQuery, "value");
      off(messageQuery, "value");
    };
  }, [id]);

  useEffect(() => {
    // If current user is not in "users"
    if (!users.find((user) => user.uid === auth.currentUser?.uid)) {
      set(ref(db, `rooms/${id}/users/${auth.currentUser?.uid}`), {
        displayName: auth.currentUser?.displayName,
        photoURL: auth.currentUser?.photoURL,
        uid: auth.currentUser?.uid,
      });
    }
  }, [users, id]);

  return isMounted ? (
    <Container sx={classes.root} disableGutters={true} maxWidth={false}>
      <div style={classes.child}>
        <Grid container justifyContent="space-evenly">
          {/* Video  */}

          <Grid item container xs={12} lg={9} sx={classes.grid}>
            <Hidden smUp>
              <NavBar users={users} />
            </Hidden>
            <VideoPlayer room={id} video={video} users={users} />
          </Grid>

          {/* Information Widget */}

          <Grid item container xs={12} lg={3} sx={classes.grid}>
            <Hidden smDown>
              <NavBar users={users} />
            </Hidden>
            <Divider />
            <Paper sx={{ height: "calc(100% - 65px)" }}>
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
                    <Tab label="Chat" value="1" />
                    <Tab label="Comments" value="2" />
                    <Tab label="Queue" value="3" />
                  </TabList>
                </Box>

                <TabPanel value="1" sx={classes.tabPanel}>
                  <ChatRoom messages={messages} room={id} />
                </TabPanel>

                {/* Comments */}
                <TabPanel value="2" sx={classes.tabPanel}>
                  <List>
                    {video?.comments
                      ? video.comments.map((item: CardItem, key: any) => {
                          return (
                            <>
                              <Card item={item} key={key} />
                              <Divider />
                            </>
                          );
                        })
                      : null}
                  </List>
                </TabPanel>

                {/* Queue */}
                <TabPanel value="3" sx={classes.tabPanel}>
                  <QueueFeed room={id} />
                </TabPanel>
              </TabContext>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Container>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: "100vh",
      }}
    >
      <CircularProgress />
    </div>
  );
}
