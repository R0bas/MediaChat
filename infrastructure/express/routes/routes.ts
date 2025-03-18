import express from "express";
import { createMediaChatHandler } from "../controllers/MediaChatController";
const router = express.Router();
router.post("/mediachats", createMediaChatHandler);
export default router;