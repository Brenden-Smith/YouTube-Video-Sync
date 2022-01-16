import { useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  List,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/styles"

import { AppTheme, Comment } from "../models";

const TestComments: Array<Comment> = [
  {
    comment: "I love comments",
    createdAt: "Today",
    displayName: "John Doe",
    photoURL: "",
  },
  {
    comment: "I love comments",
    createdAt: "Today",
    displayName: "John Doe",
    photoURL: "",
  },
  {
    comment: "I love comments",
    createdAt: "Today",
    displayName: "John Doe",
    photoURL: "",
  },
  {
    comment: "I love comments",
    createdAt: "Today",
    displayName: "John Doe",
    photoURL: "",
  },
  {
    comment: "I love comments",
    createdAt: "Today",
    displayName: "John Doe",
    photoURL: "",
  },
];

/**
 * Renders the comment feed for a given video
 */
export default function CommentFeed() {

  const theme: AppTheme = useTheme();
  const [comments, setComments] = useState(TestComments);

  /**
   * Render a comment card
   */
  function CommentCard(props: any) {
    
    const comment: Comment = props.comment

    return (
      <Grid
        container
        direction="row"
        spacing={2}
        style={{ width: "100%", padding: 10 }}
        wrap="nowrap"
      >
        <Grid item style={{ alignItems: "left" }}>
          {comment.photoURL === "" ? (
            <Avatar sx={{ background: theme.palette.background.avatar }}>
              <Box color="text.primary">
                {comment.displayName.substring(0, 1)}
              </Box>
            </Avatar>
          ) : (
            <Avatar src={comment.photoURL} />
          )}
        </Grid>
        <Grid item style={{ alignItems: "left" }}>
          <Grid container direction="column">
            <Grid
              item
              xs={12}
              alignItems="center"
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              <Typography variant="subtitle2">
                <Box color="text.primary" fontWeight="bold">
                  {comment.displayName}
                </Box>
              </Typography>
              <div style={{ width: "5px" }} />
              <Typography variant="caption">
                <Box color="text.secondary">{comment.createdAt}</Box>
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ alignItems: "left" }}>
              <Typography variant="body2">
                <Box color="text.primary">{comment.comment}</Box>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  /**
   * Render a list of comment cards
   */
  return (
    <List>
      {comments.map((item: Comment, key: any) => {
        return (
          <>
            <CommentCard comment={item} key={key}/>
            <Divider />
          </>
        );
      })}
    </List>
  );
}
