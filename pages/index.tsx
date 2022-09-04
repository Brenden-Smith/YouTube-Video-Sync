import {
  Button,
  Link,
  Stack,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { Container, Engine } from "tsparticles-engine";

const Home: NextPage = () => {
  const router = useRouter();

  function handleClick() {
    let randomChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < 6; i++)
      id += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    router.push("/room/" + id, "/room/" + id, { shallow: true });
  }

  const loadFull: any = dynamic(() => import("tsparticles").then((mod) => mod.loadFull) as any, {
    ssr: false,
  });

  const particlesInit = useCallback(async (engine: Engine) => {
    const loadFull = await import("tsparticles").then((mod) => mod.loadFull);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log(container);
  }, []);

  const Particles = dynamic(() => import("react-tsparticles"), {
    ssr: false,
  });

  return (
    <div>
      <Head>
        <title>Video Sync</title>
        <meta name="description" content="Watch videos with your friends" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: "black",
            },
            interactivity: {
              modes: {
                bubble: {
                  distance: 400,
                  duration: 2,
                  opacity: 0.8,
                  size: 40,
                },
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 2,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  value_area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                random: true,
                value: 5,
              },
            },
          }}
        />
      </div>

      <main
        className="root"
        style={{
          backgroundColor: "(0, 0, 0, 0.5)",
          zIndex: 2,
        }}
      >
        <Stack spacing={2}>
          <Typography align="center" variant="h1">
            Video Sync
          </Typography>
          <Button variant="contained" onClick={handleClick}>
            Create a room
          </Button>
        </Stack>
      </main>
      <footer style={{ position: "fixed", bottom: 0, padding: "15px" }}>
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ width: "100vw" }}
          spacing={1}
        >
          <Typography align="center" variant="body1">
            Created by{" "}
            <Link href="https://brenden-smith.com" target="_blank">
              Brenden Smith
            </Link>
          </Typography>
          <Typography align="center" variant="body1">
            •
          </Typography>
          <Stack direction="row" spacing={1}>
            <Typography>Powered by </Typography>
            <Tooltip title="Firebase">
              <div>
                <Image
                  src={"/Firebase.svg"}
                  height={20}
                  width={20}
                  alt="Firebase"
                />
              </div>
            </Tooltip>
            <Tooltip title="React">
              <div>
                <Image
                  src={"/React.svg"}
                  height={20}
                  width={20}
                  alt="React"
                />
              </div>
            </Tooltip>
            <Tooltip title="Vercel">
              <div>
                <Image
                  src={"/Vercel.png"}
                  height={20}
                  width={20}
                  alt="Vercel"
                />
              </div>
            </Tooltip>
          </Stack>
        </Stack>
      </footer>
    </div>
  );
};

export default Home;
