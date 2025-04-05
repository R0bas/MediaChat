import express from "express";
import { createMediaChatHandler } from "../controllers/MediaChatController";
import { GetUsersHandler } from "../controllers/GetUsersController";
const router = express.Router();
router.post("/mediachats", createMediaChatHandler);
router.get("/users",GetUsersHandler);
export default router;