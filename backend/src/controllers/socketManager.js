import { Server } from "socket.io";

let connections = {};
let messages = {};
let timeOnline = {};

const connectTOSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-call", (path) => {
      if (!connections[path]) {
        connections[path] = [];
      }
      connections[path].push(socket.id);
      console.log(`User ${socket.id} joined ${path}`);
    });

    socket.on("signal", (toID, message) => {
      io.to(toID).emit("signal", socket.id, message);
    });

    socket.on("chat-message", (data, sender) => {
      console.log(`Message from ${sender}:`, data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      for (const path in connections) {
        connections[path] = connections[path].filter(
          (id) => id !== socket.id
        );
      }
    });
  });

  return io;
};

export default connectTOSocket;
