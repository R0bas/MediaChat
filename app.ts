import express from "express";
import { Server } from "socket.io";
import http from "http";
import configExpress from "./infrastructure/express/config";
import client from "./infrastructure/discord";
import 'dotenv/config'

const app = express();
const port = 3000;
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

configExpress(app);
client.login(process.env.DISCORD_TOKEN);

io.on("connection", (socket) => {
  socket.on("join", (room) => {
    socket.join(room);
  });
});




server.listen(port, async() => {
  return console.info(`Express is listening at http://localhost:${port}`);
});
