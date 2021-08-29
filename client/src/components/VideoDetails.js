import React from "react";
import { Avatar, Box, Grid, Typography, useTheme } from "@material-ui/core";

const VideoDetails = (props) => {
  const theme = useTheme();

  return (
    <>
      <Grid container direction="row" spacing={2}>
        <Grid item>
          <Avatar
            style={{
              background: theme.palette.background.avatar,
              width: theme.spacing(7),
              height: theme.spacing(7),
            }}
            src={props.creator_photo}
          >
            {props.creator_photo ? null : <Box color="text.primary">T</Box>}
          </Avatar>
        </Grid>
        <Grid item direction="column">
          <Typography variant="h6">
            <Box color="text.primary" fontWeight="bold">
              {props.title}
            </Box>
          </Typography>
          <Typography variant="body1">
            <Box color="text.primary">{props.creator}</Box>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default VideoDetails;
