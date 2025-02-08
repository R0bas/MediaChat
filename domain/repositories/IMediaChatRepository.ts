import { Mediachat } from "../entities/MediaChat";

export interface IMediaChatRepository {
    create(mediaChat: Mediachat): Promise<void>;
}