import Video from "@/types/Video";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
const service = google.youtube("v3");

export async function POST(req: NextRequest, res: NextResponse) {
  const json = await req.json();
  if (!json.url)
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  const url: string = json.url;
  if (url?.includes("youtube.com/watch?v=")) {
    const videoId = url.split("youtube.com/watch?v=")[1].split("&")[0];
    const video = await service.videos
      .list({
        // @ts-ignore
        auth: "AIzaSyBJh_vBCy-Uw-87Wr8U_OJXsskwNkbLW7w",
        part: "snippet",
        id: videoId,
      })
      .then((video: any) => video.data.items[0])
      .catch((error: any) => NextResponse.json({ error }, { status: 500 }));

    if (video instanceof NextResponse) return video;
    if (!video)
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });

    const channel = await service.channels
      .list({
        // @ts-ignore
        auth: "AIzaSyBJh_vBCy-Uw-87Wr8U_OJXsskwNkbLW7w",
        part: "snippet",
        id: video.snippet.channelId as string,
      })
      .then((channel: any) => channel.data.items[0])
      .catch((error: any) => NextResponse.json({ error }, { status: 500 }));

    const model: Video = {
      key: Math.random().toString(36).substring(2, 15),
      channelUrl: `https://www.youtube.com/channel/${channel.id}`,
      channelThumbnail:
        channel.snippet.thumbnails.maxres?.url ??
        channel.snippet.thumbnails.standard?.url ??
        channel.snippet.thumbnails.high?.url ??
        channel.snippet.thumbnails.medium?.url ??
        channel.snippet.thumbnails.default?.url ??
        "",
      channelTitle: channel.snippet.title,
      videoUrl: `https://www.youtube.com/watch?v=${video.id}`,
      videoThumbnail:
        video.snippet.thumbnails.maxres?.url ??
        video.snippet.thumbnails.standard?.url ??
        video.snippet.thumbnails.high?.url ??
        video.snippet.thumbnails.medium?.url ??
        video.snippet.thumbnails.default?.url ??
        "",
      videoTitle: video.snippet.title,
    };

    return NextResponse.json(model, { status: 200 });
  }

  return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
}
