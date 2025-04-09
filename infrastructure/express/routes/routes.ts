import express from "express";
import { createMediaChatHandler } from "../controllers/MediaChatController";
import { GetUsersHandler } from "../controllers/GetUsersController";
import { CobaltHandler } from "../controllers/CobaltController";
import { TunnelHandler } from "../controllers/TunnelController";
const router = express.Router();
router.post("/mediachats", express.json(), createMediaChatHandler);
router.get("/users",express.json(),GetUsersHandler);
router.post("/cobalt",express.json(),CobaltHandler)
router.get("/tunnel",express.raw(),
TunnelHandler)

export default router;