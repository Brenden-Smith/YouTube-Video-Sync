import { Server } from "socket.io";

type Room = {
  url: string;
  title: string;
  position: number;
  users: string[];
};

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
        url: "",
        title: "",
        position: 0,
        users: [],
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

    io.in(room).emit("host", rooms[room].users[0]);
    io.in(room).emit("url", rooms[room].url);

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

    socket.on("url", (url) => {
      console.log("User:", socket.id, "Action: URL Value:", url, "Room:", room);
      rooms[room].url = url;
      _socket.to(room).emit("url", url);
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
      rooms[room].users = rooms[room].users.filter((id) => id !== socket.id);
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

  res.socket.server.io = io;
  res.status(201).json({
    success: true,
    message: "Socket is started",
    socket: `:${3001}`,
  });
}
