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
import {
  Card,
  QueueFeed,
  VideoPlayer,
  VideoDetails,
  RemoteControl,
  NavBar,
} from "../components";
import { CardItem, LocalUser, Video } from "../models";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import "../index.css";
import { useTheme } from "@mui/styles";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  onValue,
  ref,
  orderByChild,
  query,
  off,
} from "firebase/database";
import ChatRoom from "../components/ChatRoom";
import { getFunctions, httpsCallable } from "firebase/functions";

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
    overflow: "scroll"
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

const testVideo: Video = {
  creator: "SVDDEN DEATH",
  creatorPhoto:
    "https://yt3.ggpht.com/dhEsYuIrDKIv0Y-iEy-p9E8AF2xEiBtJrL87MttjvN0D7tbZxccO6VkSQuLABk8lQSMC0cLX=s88-c-k-c0x00ffffff-no-rj",
  src: "https://www.youtube.com/watch?v=BO1EYEDdFPo",
  title: "SVDDEN DEATH LIVE AT SOLD OUT RED ROCKS",
  thumbnail: "",
  comments: [
    {
      message: "I love comments",
      createdAt: "Today",
      displayName: "John Doe",
      photoURL: "",
    },
    {
      message: "I love comments",
      createdAt: "Today",
      displayName: "John Doe",
      photoURL: "",
    },
    {
      message: "I love comments",
      createdAt: "Today",
      displayName: "John Doe",
      photoURL: "",
    },
    {
      message: "I love comments",
      createdAt: "Today",
      displayName: "John Doe",
      photoURL: "",
    },
    {
      message: "I love comments",
      createdAt: "Today",
      displayName: "John Doe",
      photoURL: "",
    },
  ],
};

export default function Room() {
  const [video] = useState<Video>(testVideo);
  const [currentUser, setCurrentUser] = useState<string | undefined>("");
  const [currentRoom, setCurrentRoom] = useState<string | undefined>("");
  const [host, setHost] = useState<string>("");
  const [users, setUsers] = useState<Array<LocalUser>>([]);
  const [messages, setMessages] = useState<Array<CardItem>>([]);
  const [tab, setTab] = useState("1");
  const [isMounted, setIsMounted] = useState(false);
  const classes = useStyles(useTheme());
  const { id } = useParams();

  // Back-end loading
  useEffect(() => {

    const addUser = httpsCallable(getFunctions(), "addUser");
    const removeUser = httpsCallable(getFunctions(), "removeUser");

    const userQuery = ref(getDatabase(), `rooms/${id}/users`)
    const messageQuery = query(
      ref(getDatabase(), `messages/${id}`),
      orderByChild("serverTimestamp")
    )
    const hostQuery = ref(getDatabase(), `rooms/${id}/host`)

    async function initializeRoom() {
      if (getAuth().currentUser) {

        setCurrentUser(getAuth().currentUser?.uid)
        setCurrentRoom(id)
        await addUser({
          room: id,
          uid: getAuth().currentUser?.uid.toString(),
          displayName: getAuth().currentUser?.displayName,
          photoURL: getAuth().currentUser?.photoURL,
        });

        // User data listener
        onValue(
          userQuery,
          (snapshot) => {
            if (snapshot.val()) {
              let data: Array<LocalUser> = [];
              snapshot.forEach((user) => {
                data.push(user.val());
              });
              setUsers([...data]);
            }
          }
        );

        // Message data listener
        onValue(
          messageQuery,
          (snapshot) => {
            if (snapshot.val()) {
              let data: Array<CardItem> = [];
              snapshot.forEach((message) => {
                data.push(message.val());
              });
              setMessages([...data]);
            }
          }
        );

        // Host data listener
        onValue(hostQuery, (snapshot) => {
          if (snapshot.val()) {
            setHost(snapshot.val());
          }
        })

        setIsMounted(true);
      }
    }

    initializeRoom();

    return () => {
      removeUser({
        room: currentRoom,
        uid: currentUser
      });
      off(userQuery, "value");
      off(messageQuery, "value");
      off(hostQuery, "value");
    };
  }, []);

  return isMounted ? (
    <Container sx={classes.root} disableGutters={true} maxWidth={false}>
      <div style={classes.child}>
        <Grid container justifyContent="space-evenly">
          {/* Video  */}

          <Grid item container xs={12} lg={9} sx={classes.grid}>
            <Hidden smUp>
              <NavBar users={users} />
            </Hidden>
            <VideoPlayer room={id} host={host}/>
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
            <div style={{ height: "30px" }} />
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
                  <QueueFeed />
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
