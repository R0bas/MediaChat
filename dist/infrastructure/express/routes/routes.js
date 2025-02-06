"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MediaChatController_1 = require("../controllers/MediaChatController");
const router = express_1.default.Router();
router.post("/mediachats", MediaChatController_1.createMediaChatHandler);
exports.default = router;
//# sourceMappingURL=routes.js.map