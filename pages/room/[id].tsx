import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <CircularProgress sx={{ color: "white" }} />
    </div>
  );
};

const Instance = dynamic(
  () => import("../../lib/components/Instance").then((mod) => mod.Instance),
  {
    ssr: false,
    loading: Loading,
  }
);

export default function Room() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <Head>
        <title>Video Sync | New Room</title>
      </Head>
      <Instance />
    </div>
  );
}
