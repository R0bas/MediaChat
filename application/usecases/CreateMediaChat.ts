import { Author } from "../../domain/entities/Author";
import { Media } from "../../domain/entities/Media";
import { Mediachat } from "../../domain/entities/MediaChat";
import { IMediaChatRepository } from "../../domain/repositories/IMediaChatRepository";

export class CreateMediaChat {
  constructor(private mediaChatRepository: IMediaChatRepository) {}
  async execute(
    author: Author,
    duration: number,
    media: Media,
    message: string
  ): Promise<Mediachat> {
    const mediaChat = new Mediachat("id", author, duration, message, media);
    await this.mediaChatRepository.create(mediaChat);
    return mediaChat;
  }
}
