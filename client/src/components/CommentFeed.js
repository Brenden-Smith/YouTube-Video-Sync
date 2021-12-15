import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Grid,
  List,
  Typography,
  useTheme,
} from "@material-ui/core";

class Comment {
  constructor(pfp, name, time, comment) {
    this.pfp = pfp;
    this.name = name;
    this.time = time;
    this.comment = comment;
  }
}

const TestComments = [
  new Comment(null, "John Doe", "Today", "I love comments"),
  new Comment(null, "John Doe", "Today", "I love comments"),
  new Comment(null, "John Doe", "Today", "I love comments"),
  new Comment(null, "John Doe", "Today", "I love comments"),
  new Comment(null, "John Doe", "Today", "I love comments"),
  new Comment(null, "John Doe", "Today", "I love comments"),
  new Comment(null, "John Doe", "Today", "I love comments"),
  new Comment(
    null,
    "John Doe John Doe John Doe John Doe John Doe",
    "3 days ago",
    "I love comments I love comments I love comments I love comments I love comments I love comments I love comments I love comments I love comments "
  ),
  new Comment(null, "John Doe", "Today", "I love comments"),
  new Comment(null, "John Doe", "Today", "I love comments"),
  new Comment(null, "John Doe", "Today", "I love comments"),
  new Comment(null, "John Doe", "Today", "I love comments"),
];

function CommentCard(props) {
  const theme = useTheme();
  return (
    <Grid
      container
      direction="row"
      spacing={2}
      style={{ width: "100%", padding: 10 }}
      wrap="nowrap"
    >
      <Grid item align="left">
        {props.comment.pfp === null ? (
          <Avatar style={{ background: theme.palette.background.avatar }}>
            <Box color="text.primary">{props.comment.name.substring(0, 1)}</Box>
          </Avatar>
        ) : (
          <Avatar src={props.comment.pfp} />
        )}
      </Grid>
      <Grid item align="left">
        <Grid container direction="column">
          <Grid
            item
            xs={12}
            alignItems="center"
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Typography variant="subtitle2">
              <Box color="text.primary" fontWeight="bold">
                {props.comment.name}
              </Box>
            </Typography>
            <div style={{ width: "5px" }} />
            <Typography variant="caption">
              <Box color="text.secondary">{props.comment.time}</Box>
            </Typography>
          </Grid>
          <Grid item xs={12} align="left">
            <Typography variant="body2">
              <Box color="text.primary">{props.comment.comment}</Box>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withStyles({ withTheme: true })(
  class CommentFeed extends Component {
    render() {
      return (
        <List>
          {TestComments.map(function (c) {
            return (
              <>
                <CommentCard comment={c} />
                <Divider />
              </>
            );
          })}
        </List>
      );
    }
  }
);
