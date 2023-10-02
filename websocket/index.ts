import { serve } from "bun";
import Room from "./types/Room";
import Video from "./types/Video";
import { faker } from "@faker-js/faker";

const rooms: { [key: string]: Room } = {};
type Message = { room: string; event: string; data: unknown };

serve<{ user: string; room: string }>({
  fetch(req, server) {
    const room = req.url.split("?room=")[1];
    let user = faker.internet.userName();
    while (rooms[room] && rooms[room].users.includes(user)) {
      user = faker.internet.userName();
    }
    const success = server.upgrade(req, { data: { user, room } });
    if (success) return;
    return new Response("WebSocket connection failed", { status: 400 });
  },
  port: process.env.PORT,
  websocket: {
    open(ws) {
      if (!rooms[ws.data.room]) {
        rooms[ws.data.room] = {
          users: [],
          queue: [],
          position: 0,
          skipCooldown: false,
        };
      }
      ws.subscribe(ws.data.room);
      rooms[ws.data.room].users.push(ws.data.user);
      ws.send(
        JSON.stringify({
          event: "room",
          data: rooms[ws.data.room],
          user: ws.data.user,
        })
      );
    },

    message(ws, message) {
      const { event, data }: Message = JSON.parse(
        message instanceof Buffer ? new TextDecoder().decode(message) : message
      );
      console.log(
        "Received message:",
        { event, data },
        "from",
        ws.data.user,
        "in room",
        ws.data.room
      );
      switch (event) {
        case "play":
          ws.publish(ws.data.room, JSON.stringify({ event: "play" }));
          break;
        case "pause":
          ws.publish(ws.data.room, JSON.stringify({ event: "pause" }));
          break;
        case "seek":
          ws.publish(ws.data.room, JSON.stringify({ event: "seek", data }));
          ws.send(JSON.stringify({ event: "seek", data }));
          break;
        case "queue_update":
          const queue = data as Video[];
          rooms[ws.data.room].queue = queue;
          ws.publish(
            ws.data.room,
            JSON.stringify({ event: "queue_update", data: queue })
          );
          ws.send(JSON.stringify({ event: "queue_update", data: queue }));
          break;
        case "queue_next":
          if (
            rooms[ws.data.room].skipCooldown ||
            rooms[ws.data.room].queue.length === 0
          )
            return;
          rooms[ws.data.room].queue.shift();
          ws.publish(
            ws.data.room,
            JSON.stringify({
              event: "queue_update",
              data: rooms[ws.data.room].queue,
            })
          );
          ws.send(
            JSON.stringify({
              event: "queue_update",
              data: rooms[ws.data.room].queue,
            })
          );
          rooms[ws.data.room].skipCooldown = true;
          setTimeout(() => {
            rooms[ws.data.room].skipCooldown = false;
          }, 5000);
          break;
        case "position":
          if (ws.data.user === rooms[ws.data.room].users[0]) {
            rooms[ws.data.room].position = data as number;
            ws.publish(
              ws.data.room,
              JSON.stringify({
                event: "position",
                data: rooms[ws.data.room].position,
              })
            );
          }
          break;
      }
    },
    close(ws) {
      ws.unsubscribe(ws.data.room);
      rooms[ws.data.room].users = rooms[ws.data.room].users.filter(
        (id) => id !== ws.data.user
      );
    },
  },
});

console.log("Server started on port process.env.PORT");
