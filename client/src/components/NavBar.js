import {
  CircularProgress,
  IconButton,
  InputBase,
  Tooltip,
} from "@material-ui/core";
import { AppBar, Avatar, Toolbar, Typography } from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import { alpha, withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import firebase from "../auth/firebase";
import "firebase/auth";
import React from "react";

const auth = firebase.auth();

const styles = (theme) => ({
  appbar: {
    backgroundColor: theme.palette.background.appbar,
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  inputRoot: {
    color: "inherit",
    width: "500px",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  search: {
    color: theme.palette.text.primary,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.action.disabledBackground, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.action.disabledBackground, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: theme.palette.text.primary,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
});

export default withStyles(styles, { withTheme: true })(
  class NavBar extends React.Component {
    constructor() {
      super();
      this.state = {
        users: null,
        isLoaded: false,
      };
    }

    componentDidMount() {
      this.setState({ users: [firebase.auth().currentUser], isLoaded: true });
    }

    render() {
      const { users, isLoaded } = this.state;
      const { classes } = this.props;
      return (
        <AppBar className={classes.appbar}>
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              YouTube Video Sync
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div style={{ flexGrow: 1 }} />
            {isLoaded ? (
              <AvatarGroup max={5} spacing="medium">
                {users.map((item, index) => {
                  return (
                    <Tooltip title={item.displayName}>
                      <Avatar alt={item.displayName} src={item.photoURL} />
                    </Tooltip>
                  );
                })}
                ;
              </AvatarGroup>
            ) : (
              <CircularProgress/>
            )}
            <Tooltip title="Sign Out">
              <IconButton onClick={() => auth.signOut()}>
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      );
    }
  }
);
