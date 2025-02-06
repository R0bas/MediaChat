import express from "express";
import { Server } from "socket.io";
import http from "http";
import configExpress from "./infrastructure/express/config";
import youtubedl from "youtube-dl-exec";
import { log } from "console";

const app = express();
const port = 3000;
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

configExpress(app);


io.on("connection", () => {
  console.info("a user connected");
});

server.listen(port, async() => {


  return console.info(`Express is listening at http://localhost:${port}`);
});
