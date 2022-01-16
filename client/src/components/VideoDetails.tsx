import React from "react"
import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import { AppTheme } from "../models";
import { useTheme } from "@mui/styles";
import { Theme } from "@mui/material";

export default function VideoDetails(props: any) {
  const theme: Theme & AppTheme = useTheme();

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
            src={props.creatorPhoto}
          >
            {props.creatorPhoto === "" ? null : <Box color="text.primary">T</Box>}
          </Avatar>
        </Grid>
        <Grid item>
          <Container disableGutters={true}>
            <Typography component="span" variant="h6">
              <Box color="text.primary" fontWeight="bold">
                {props.title}
              </Box>
            </Typography>
            <Typography component="span"variant="body1">
              <Box color="text.primary">{props.creator}</Box>
            </Typography>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};
