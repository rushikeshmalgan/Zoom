import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const httpServer = createServer(app);

// middleware
app.use(cors());
app.use(express.json());

// socket.io setup
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// socket connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// routes
app.get("/home", (req, res) => {
  res.json({ hello: "World" });
});

// start server
const start = async () => {
  try {
    // MongoDB (optional for now)
    // await mongoose.connect(process.env.MONGO_URI);

    httpServer.listen(8000, () => {
      console.log("🚀 Server running on port 8000");
    });
  } catch (error) {
    console.error(error);
  }
};

start();

