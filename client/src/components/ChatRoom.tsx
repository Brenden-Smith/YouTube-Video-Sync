import {
  Grid,
  TextField,
  Theme,
  useTheme,
  List,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { AppTheme, CardItem } from "../models";
import SendIcon from "@mui/icons-material/Send";
import Card from "./Card";
import { serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { ref, push } from "firebase/database";
import { auth, db } from "../firebase/firebase";

const useStyles = (theme: Theme & AppTheme) => ({
  root: {
    height: "100%",
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
});

export default function ChatRoom(props: any) {
  const messages: Array<CardItem> = props.messages;
  const classes = useStyles(useTheme());
  const [message, setMessage] = useState("");
  const { room } = props;

  async function sendMessage(messageText: string) {
    const today = new Date();
    const m = today.getHours() > 12 ? "PM" : "AM";
    const timeString = `${today.getHours() % 12}:${today.getMinutes()} ${m}`;
    await push(ref(db, `messages/${room}`), {
      displayName: auth.currentUser?.displayName,
      message: messageText,
      photoURL: auth.currentUser?.photoURL,
      createdAt: timeString,
      serverTimestamp: serverTimestamp(),
    })
      .then(() => {
        setMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Grid container direction="column" sx={classes.root}>
      <Grid item container>
        <List
          sx={{
            width: "100%",
            height: "74vh",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: "-20px",
              bottom: "-20px",
              overflow: "auto",
            }}
          >
            {messages
              ? messages.map((item: CardItem, key: any) => {
                  return (
                    <>
                      <Card item={item} key={key} />
                      <Divider />
                    </>
                  );
                })
              : null}
          </div>
        </List>
      </Grid>
      <Grid item container sx={{ width: "100%" }}>
        <TextField
          autoComplete="off"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={async () => sendMessage(message)}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
}
