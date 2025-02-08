import { Server } from "socket.io";
import { Mediachat } from "../../domain/entities/MediaChat";
import { IMediaChatRepository } from "../../domain/repositories/IMediaChatRepository";

export class SendMediaChat implements IMediaChatRepository {
    private static server: Server;
    constructor(server: Server) {
    SendMediaChat.server = server;
    }
    async create(mediaChat:Mediachat): Promise<void> {
    SendMediaChat.server.emit("mediachat", mediaChat);
  }
}