"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMediaChatHandler = void 0;
const app_1 = require("../../../app");
const CreateMediaChat_1 = require("../../../application/usecases/CreateMediaChat");
const SendMediaChat_1 = require("../../socket/SendMediaChat");
const createMediaChatHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sendMediaChat = new SendMediaChat_1.SendMediaChat(app_1.io);
        const createMediaChat = new CreateMediaChat_1.CreateMediaChat(sendMediaChat);
        const { author, duration, media, message } = req.body;
        const mediaChat = yield createMediaChat.execute(author, duration, media, message);
        /* const test = await youtubedl('https://www.youtube.com/watch?v=6xKWiCMKKJg', {
          dumpSingleJson: true,
          noCheckCertificates: true,
          noWarnings: true,
          preferFreeFormats: true,
          addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
          format: 'best[ext=mp4]',
        }) as Payload
        console.log(typeof test); */
        res.status(201).json(mediaChat);
    }
    catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: "An unknown error occurred" });
        }
    }
});
exports.createMediaChatHandler = createMediaChatHandler;
//# sourceMappingURL=MediaChatController.js.map