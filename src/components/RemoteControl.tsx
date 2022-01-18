import React from "react"
import { Button, Grid, } from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

export default function RemoteControl() {

    const [isPlaying, setIsPlaying] = React.useState(true);

    return (
      <Grid container>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="primary">
            <SkipNextIcon />
          </Button>
        </Grid>
      </Grid>
    );
}