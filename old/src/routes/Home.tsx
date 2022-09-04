import React from "react"

// Material UI
import { Button, Grid, Paper, Typography, Theme, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";

/**
 * Styles for the home screen
 */


/**
 * Landing screen for the application
 */
export default function Home() {

  const classes = useStyles(useTheme())
  const navigate = useNavigate();

  function handleClick() {
    let randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = '';
    for (let i = 0; i < 6; i++) {
      id += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    navigate(`/room/${id}`, { replace: true });
  }

  return (
    
  );
};
