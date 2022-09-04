import { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "firebase-admin/database";
const { google } = require("googleapis");
import "../../../lib/services/firebase-admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method !== "POST") res.status(405).end();
  const service = google.youtube("v3");
  const { videoId, roomId } = req.query;
  const video = await service.videos
    .list({
      auth: process.env.FIREBASE_API_KEY,
      part: "snippet",
      id: videoId,
    })
    .then((video: any) => video.data.items[0])
    .catch((error: any) => res.status(500).json(error));

  let key: number;
  let isVideoInQueue: boolean;
  await Promise.all([
    (key = await getDatabase()
      .ref(`rooms/${roomId}/queue/top`)
      .once("value")
      .then((snapshot) => (snapshot.exists() ? snapshot.val() : 0))),
    (isVideoInQueue = await getDatabase()
      .ref(`rooms/${roomId}/video`)
      .once("value")
      .then((snapshot) => snapshot.hasChild("videoId"))),
  ]).catch((error: any) => res.status(500).json(error));

  const model = {
    channelId: video.snippet.channelId,
    channelTitle: video.snippet.channelTitle,
    videoId: video.id,
    videoThumbnail: video.snippet.thumbnails["default"].url,
    videoTitle: video.snippet.title,
    action: "play",
    time: 0,
  };

  const reference = isVideoInQueue
    ? `rooms/${roomId}/queue/items/${key}`
    : `rooms/${roomId}/video`;

  getDatabase()
    .ref(reference)
    .set(model)
    .then(async () => {
      if (isVideoInQueue) {
        await getDatabase()
          .ref(`rooms/${roomId}/queue/top`)
          .transaction((current) => {
            return (current || 0) + 1;
          });
      }
      
    });
  return res.status(200).json({ success: true });
}
