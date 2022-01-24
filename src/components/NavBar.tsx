import React from "react";
import { CircularProgress, IconButton, Tooltip, Theme } from "@mui/material";
import { AppBar, Avatar, Toolbar } from "@mui/material";
import { AvatarGroup } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { getAuth, signOut } from "firebase/auth";
import { useTheme } from "@mui/styles";
import { AppTheme, LocalUser } from "../models";
import { useNavigate } from "react-router-dom";

const useStyles = (theme: Theme & AppTheme) => ({
  appbar: {
    backgroundColor: theme.palette.background.appbar,
  },
});

export default function NavBar(props: any) {
  const classes: any = useStyles(useTheme());
  const users: Array<LocalUser> = props.users;
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut(getAuth());
    navigate("/")
  }

  return (
    <AppBar sx={classes.appbar} position="static" elevation={0}>
      <Toolbar>
        {users ? (
          <AvatarGroup max={5} spacing="medium">
            {users.map((item: any, index: number) => {
              console.log(item)
              return (
                item && (
                  <Tooltip title={item.displayName || ""} key={index}>
                    <Avatar
                      alt={item.displayName || ""}
                      src={item.photoURL || ""}
                    />
                  </Tooltip>
                )
              );
            })}
            ;
          </AvatarGroup>
        ) : (
          <CircularProgress />
        )}
        <div style={{ flexGrow: 1 }} />
        <Tooltip title="Sign Out">
          <IconButton onClick={() => handleSignOut()}>
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
