import Head from "next/head";
import dynamic from "next/dynamic";
import { SSRLoading } from "../../lib/components/SSRLoading";
import { useRouter } from "next/router";

const Instance = dynamic(
  () => import("../../lib/components/Instance").then((mod) => mod.Instance),
  {
    ssr: false,
    loading: SSRLoading,
  }
);

export default function Room() {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Video Sync | {router.query.id}</title>
      </Head>
      <Instance />
    </div>
  );
}
