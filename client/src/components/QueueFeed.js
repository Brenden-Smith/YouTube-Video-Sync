import React, { Component } from "react";
import { Box, Container, Divider, Grid, List, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    thumbnail: {
        backgroundColor: 'black',
        height: '36px',
        width: '64px',
    }
}));

class Video {
    constructor(thumbnail, name, creator, pfp) {
        this.thumbnail = thumbnail;
        this.name = name;
        this.creator = creator;
        this.pfp = pfp;
    }
}

const TestVideos = [
    new Video(
        null,
        "How to shoot a firework",
        "Tom Scott"
    ),
    new Video(
        null,
        "How to shoot a firework",
        "Tom Scott"
    ),
    new Video(
        null,
        "How to shoot a firework",
        "Tom Scott"
    ),
    new Video(
        null,
        "How to shoot a firework",
        "Tom Scott"
    ),
    new Video(
        null,
        "How to shoot a firework",
        "Tom Scott"
    ),
    new Video(
        null,
        "How to shoot a firework",
        "Tom Scott"
    ),
    new Video(
        null,
        "How to shoot a firework",
        "Tom Scott"
    ),
    new Video(
        null,
        "How to shoot a firework",
        "Tom Scott"
    ),
    new Video(
        null,
        "How to shoot a firework",
        "Tom Scott"
    ),
];

function QueueCard(props) {

    const classes = useStyles();

    return (
        <Grid container direction="row" spacing={2} style={{width: '100%', padding: 10}} wrap="nowrap">
            <Grid item align="left">
                <Typography variant="h6"><Box color="text.primary">{props.index+1}.</Box></Typography>
            </Grid>
            <Grid item align="left">
                <Container className={classes.thumbnail}>
                    {props.video.thumbnail===null ? null : <img src={props.video.thumbnail} style={{height: '100%', width: '100%'}} alt="thumbnail"/>}
                </Container>
            </Grid>
            <Grid item align="left">
                <Grid container direction="column">
                    <Grid item xs={12} alignItems="center">
                        <Typography variant="subtitle2"><Box color="text.primary" fontWeight="bold">{props.video.name}</Box></Typography>
                        <div style={{width: '5px'}}/>
                        <Typography variant="caption"><Box color="text.secondary">{props.video.creator}</Box></Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default class QueueFeed extends Component {

    render() {
        return (
            <List>
              {Object.keys(TestVideos).map(function (key, index) {
                return (
                  <>
                    <QueueCard index={index} video={TestVideos[key]} />
                    <Divider />
                  </>
                );
              })}
            </List>
        );
    }
}