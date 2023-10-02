import Room from "@/types/Room";
import Video from "@/types/Video";
import { NextResponse } from "next/server";
import { Server } from "socket.io";

const rooms: { [key: string]: Room } = {};

export function GET(req: any, res: any) {
  if (res?.socket?.server?.io) {
    res.status(200).json({
      success: true,
      message: "Socket is already running",
      socket: `:${3001}`,
    });
    return;
  }

  console.log("Starting Socket.IO server on port:", 3001);
  //@ts-expect-error
  const io = new Server({
    path: "/api/socket",
    addTrailingSlash: false,
    cors: { origin: "*" },
  }).listen(3001);

  io.on("connect", (socket) => {
    const _socket = socket;
    const room = socket.handshake.query.room as string;
    if (!room) {
      socket.disconnect();
      return;
    }

    if (!rooms[room]) {
      rooms[room] = {
        users: [],
        queue: [],
        position: 0,
        skipCooldown: false,
      };
    }
    socket.join(room);
    rooms[room].users.push(socket.id);
    console.log(
      socket.id,
      "joined room",
      room,
      "and now has",
      rooms[room].users.length,
      "users"
    );

    io.in(room).emit("room", rooms[room]);

    socket.on("play", () => {
      console.log("User:", socket.id, "Action: Play Room:", room);
      _socket.to(room).emit("play");
    });

    socket.on("pause", () => {
      console.log("User:", socket.id, "Action: Pause Room:", room);
      _socket.to(room).emit("pause");
    });

    socket.on("seek", (time) => {
      console.log(
        "User:",
        socket.id,
        "Action: Seek Value:",
        time,
        "Room:",
        room
      );
      _socket.broadcast.emit("seek", time);
    });

    socket.on("queue_update", (queue: Video[]) => {
      console.log(
        "User:",
        socket.id,
        "Action: Update Queue:",
        queue,
        "Room:",
        room
      );
      rooms[room].queue = queue;
      io.in(room).emit("queue_update", queue);
    });

    socket.on("queue_next", () => {
      if (rooms[room].skipCooldown) return;
      console.log("User:", socket.id, "Action: Next Queue:", "Room:", room);
      rooms[room].queue.shift();
      io.in(room).emit("queue_update", rooms[room].queue);
      rooms[room].skipCooldown = true;
      setTimeout(() => {
        rooms[room].skipCooldown = false;
      }, 5000);
    });

    socket.on("position", (position) => {
      if (socket.id === rooms[room].users[0]) {
        console.log(
          "User:",
          socket.id,
          "Action: Set Position:",
          position,
          "Room:",
          room
        );
        rooms[room].position = position;
        _socket.to(room).emit("position", position, rooms[room].users[0]);
      }
    });

    socket.on("disconnect", () => {
      socket.leave(room);
      rooms[room].users = rooms[room].users.filter(
        (id: string) => id !== socket.id
      );
      console.log(
        socket.id,
        "left room",
        room,
        "and now has",
        rooms[room].users.length,
        "users"
      );
    });
  });

  if (!res.socket) res.socket = {};
  if (!res.socket.server) res.socket.server = {};
  res.socket.server.io = io;

  return NextResponse.json(
    {
      success: true,
      message: "Socket is started",
      socket: `:${3001}`,
    },
    { status: 201 }
  );
}
