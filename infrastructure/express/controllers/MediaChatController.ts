import { io } from "../../../app";
import { CreateMediaChat } from "../../../application/usecases/CreateMediaChat";
import { SendMediaChat } from "../../socket/SendMediaChat";
import { Request, Response } from "express";
import youtubedl, { Payload } from "youtube-dl-exec";

export const createMediaChatHandler = async (req: Request, res: Response) => {
  try {
    const sendMediaChat = new SendMediaChat(io);
    const createMediaChat = new CreateMediaChat(sendMediaChat);
    const { author, duration , media, message } = req.body;
    const mediaChat = await createMediaChat.execute(author, duration, media, message);
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
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};
