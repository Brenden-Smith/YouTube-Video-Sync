import React from "react"
const ResponsiveEmbed = require("react-responsive-embed");

const styles = {
  container: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    paddingTop: "56.25%"
  },
  iframe: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  }
} as any

export default function VideoPlayer(props: any) {
  return (
    <div style={styles.container}>
      <iframe
        src={props.src}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        style={styles.iframe}
      />
    </div>
  );
}
