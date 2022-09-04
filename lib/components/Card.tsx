import React from "react";
import { Avatar, Box, Grid, Typography, Theme, useTheme } from "@mui/material";

import { AppTheme, CardItem } from "../models";

export default function Card(props: any) {
  const item: CardItem = props.item;
  const theme: AppTheme & Theme = useTheme();

  return (
    <Grid
      container
      direction="row"
      spacing={2}
      style={{ width: "100%", padding: 10 }}
      wrap="nowrap"
    >
      <Grid item style={{ alignItems: "left" }}>
        {item.photoURL === "" ? (
          <Avatar sx={{ background: theme.palette.background.avatar }}>
            <Box color="text.primary">{item.displayName.substring(0, 1)}</Box>
          </Avatar>
        ) : (
          <Avatar src={item.photoURL} />
        )}
      </Grid>
      <Grid item style={{ alignItems: "left" }}>
        <Grid container direction="column">
          <Grid
            item
            alignItems="center"
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Typography variant="subtitle2">
              <Box color="text.primary" fontWeight="bold">
                {item.displayName}
              </Box>
            </Typography>
            <div style={{ width: "5px" }} />
            <Typography variant="caption">
              <Box color="text.secondary">{item.createdAt.toString()}</Box>
            </Typography>
          </Grid>
          <Grid item style={{ alignItems: "left" }}>
            <Typography variant="body2">
              <Box color="text.primary">{item.message}</Box>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
