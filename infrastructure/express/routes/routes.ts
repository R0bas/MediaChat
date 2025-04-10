import { createMediaChatHandler } from "../controllers/MediaChatController";
import { GetUsersHandler } from "../controllers/GetUsersController";
import { CobaltHandler } from "../controllers/CobaltController";
import { TunnelHandler } from "../controllers/TunnelController";
import express from "express";
import { YtTokenHandler } from "../controllers/YtTokenController";

const router = express.Router();
router.post("/mediachats", createMediaChatHandler);
router.get("/users", GetUsersHandler);
router.post("/cobalt", CobaltHandler);
router.get("/tunnel", express.raw(), TunnelHandler);
router.get("/token", YtTokenHandler)

export default router;
