import React from "react";
import ResponsiveEmbed from "react-responsive-embed";

const VideoPlayer = (props) => {
  return (
      <ResponsiveEmbed
        src={props.src}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
  );
};

export default VideoPlayer;
