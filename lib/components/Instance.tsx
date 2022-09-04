import { CircularProgress } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { RoomProvider, useRoom } from "../context";
import { Controls } from "./Controls";
import { Header } from "./Header";
import { Player } from "./Player";

export function Instance() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <RoomProvider id={id as string}>
      <Component />
    </RoomProvider>
  );
}

export function Component() {
  const { setVisible, playing, player, setPlaying } = useRoom();

  useEffect(() => {
    let timer: any = null;
    window.onmousemove = (e) => {
      clearTimeout(timer);
      setVisible(true);
      timer = setTimeout(() => setVisible(false), 3000);
    };
  }, [setVisible]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          width: "100vw",
          height: "84%",
          zIndex: 2,
        }}
      />

      <main className="root">
        <header
          style={{
            position: "fixed",
            top: 0,
            width: "100vw",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Header />
        </header>
        <Player />
      </main>

      <footer
        style={{
          position: "fixed",
          bottom: 0,
          width: "100vw",
          zIndex: 3,
        }}
      >
        <Controls />
      </footer>
    </>
  );
}
