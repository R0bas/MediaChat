import express from "express";
import { Server } from "socket.io";
import http from "http";
import configExpress from "./infrastructure/express/config";
import client from "./infrastructure/discord";

const app = express();
const port = 3000;
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const { token, clientId, guildId } = {
  token:
    "MTMzNDI3MTg0ODMwMDU0ODE0Ng.G_7L9n.nssoK5kUP-iFJck489WkYGL2bYjwMUpVO_rJV8",
  clientId: "1334271848300548146",
  guildId: "1334198171567394908",
};
configExpress(app);
client.login(token);

io.on("connection", () => {
  console.info("a user connected");
});

server.listen(port, async() => {
  return console.info(`Express is listening at http://localhost:${port}`);
});
