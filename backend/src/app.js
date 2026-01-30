import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import connectTOSocket from "./controllers/socketManager.js";
import userRoutes from 
const app = express();
const server = createServer(app);
const io = connectTOSocket(server);

app.use(cors());

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit : "40kb", extended: true}));

const start = async () => {
  // fixed password encoding (@ → %40)
  const connectionDb = await mongoose.connect(
    "mongodb+srv://rushikesh_db:Rushi%402004@cluster0.j76oagw.mongodb.net/mydb"
  );
  console.log(`Mongo Connected DB Host : ${connectionDb.connection.host}`)
  server.listen(app.get("port"), () => {
    console.log("Listening on Port 8000");
  });
};

start();
