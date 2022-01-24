import React from "react"
import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import { AppTheme, Video } from "../models";
import { useTheme } from "@mui/styles";
import { Theme } from "@mui/material";

export default function VideoDetails(props: any) {
  const theme: Theme & AppTheme = useTheme();
  const video: Video = props.video

  return (
    <>
      <Grid container direction="row" spacing={2}>
        <Grid item>
          {video.channelThumbnail &&
            <Avatar
              style={{
                background: theme.palette.background.avatar,
                width: theme.spacing(7),
                height: theme.spacing(7),
              }}
              src={video.channelThumbnail}
            >
              {video.channelThumbnail === "" ? null : <Box color="text.primary">T</Box>}
            </Avatar>
          }
        </Grid>
        <Grid item>
          <Container disableGutters={true}>
            <Typography component="span" variant="h6">
              <Box color="text.primary" fontWeight="bold">
                {video.videoTitle}
              </Box>
            </Typography>
            <Typography component="span"variant="body1">
              <Box color="text.primary">{video.channelTitle}</Box>
            </Typography>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};
