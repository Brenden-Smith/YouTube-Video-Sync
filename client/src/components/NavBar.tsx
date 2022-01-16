import { useState } from "react";
import {
  CircularProgress,
  IconButton,
  Tooltip,
  Theme,
} from "@mui/material";
import { AppBar, Avatar, Toolbar } from "@mui/material";
import { AvatarGroup } from "@mui/lab";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useEffect } from "react";
import { getAuth, signOut, User } from "firebase/auth";
import { useTheme } from "@mui/styles";
import { AppTheme } from "../models";

const useStyles = (theme: Theme & AppTheme) => ({
  appbar: {
    backgroundColor: theme.palette.background.appbar,
    boxShadow: 4,
  },
  
  title: {
    color: theme.palette.text.primary,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
});

export default function NavBar() {
  const classes: any = useStyles(useTheme());
  const [users, setUsers] = useState<Array<User | null>>([]);

  async function handleSignOut() {
    await signOut(getAuth());
  }

  // Get users in room
  useEffect(() => {
    setUsers([getAuth().currentUser, getAuth().currentUser, getAuth().currentUser, getAuth().currentUser, getAuth().currentUser]);
  }, []);

  return (
    <AppBar sx={classes.appbar} position="static" elevation={0}>
      <Toolbar>
        {users ? (
          <AvatarGroup max={5} spacing="medium">
            {users.map((item: User | null, index: number, key: any) => {
              return (
                item && (
                  <Tooltip title={item.displayName || ""} key={key}>
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
