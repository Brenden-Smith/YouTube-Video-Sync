import React from "react"
import {
  Box,
  Divider,
  Grid,
  List,
  Theme,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Video } from "../models";
import { useState } from "react";
import { useTheme } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";

const useStyles = (theme: Theme) => ({
  thumbnail: {
    backgroundColor: "black",
    height: "36px",
    width: "64px",
  },
});


const TestVideos: Array<Video> = [
  {
    title: "The Consequences of Your Code",
    creator: "Tom Scott",
    thumbnail: "https://i3.ytimg.com/vi/LZM9YdO_QKk/maxresdefault.jpg",
  },
  {
    title: "The Consequences of Your Code",
    creator: "Tom Scott",
    thumbnail: "https://i3.ytimg.com/vi/LZM9YdO_QKk/maxresdefault.jpg",
  },
  {
    title: "The Consequences of Your Code",
    creator: "Tom Scott",
    thumbnail: "https://i3.ytimg.com/vi/LZM9YdO_QKk/maxresdefault.jpg",
  },
  {
    title: "The Consequences of Your Code",
    creator: "Tom Scott",
    thumbnail: "https://i3.ytimg.com/vi/LZM9YdO_QKk/maxresdefault.jpg",
  },
  {
    title: "The Consequences of Your Code",
    creator: "Tom Scott",
    thumbnail: "https://i3.ytimg.com/vi/LZM9YdO_QKk/maxresdefault.jpg",
  },
];

export default function QueueFeed() {

  const [error] = useState(null)
  const [queue, setQueue] = useState(TestVideos)
  const [loading, setLoading] = useState(false)
  const classes = useStyles(useTheme())

  async function handleAddToQueue() {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setQueue([...queue, {
      title: "The Consequences of Your Code",
      creator: "Tom Scott",
      thumbnail: "https://i3.ytimg.com/vi/LZM9YdO_QKk/maxresdefault.jpg",
    }])
    setLoading(false)
  }

  /**
   * Render a video queue item
   */
  function QueueCard(props: any) {
    const { video, index } = props
    return (
      <Grid
        container
        direction="row"
        spacing={2}
        style={{ width: "100%", padding: 10 }}
        wrap="nowrap"
      >
        <Grid item alignItems="left">
          <Typography variant="h6">
            <Box color="text.primary">{index + 1}.</Box>
          </Typography>
        </Grid>
        <Grid item alignItems="left">
          <img
            src={video.thumbnail === "" ? null : video.thumbnail}
            style={classes.thumbnail}
            alt="thumbnail"
          />
        </Grid>
        <Grid item alignItems="left">
          <Grid container direction="column">
            <Grid item xs={12} alignItems="center">
              <Typography variant="subtitle2">
                <Box color="text.primary" fontWeight="bold">
                  {video.title}
                </Box>
              </Typography>
              <div style={{ width: "5px" }} />
              <Typography variant="caption">
                <Box color="text.secondary">{video.creator}</Box>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  /**
   * Render a list of video queue items
   */
  return (
    <>
      <TextField
        error={error !== null}
        label="YouTube URL"
        fullWidth={true}
        helperText={error}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleAddToQueue} disabled={loading}>
                {loading ? <CircularProgress color="primary" size={24} /> : <AddIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <List>
        {queue.map((item: Video, index: number, key: any) => {
          return (
            <>
              <QueueCard index={index} video={item} key={key} />
              <Divider />
            </>
          );
        })}
      </List>
    </>
  );
}
