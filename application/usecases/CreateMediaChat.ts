import { Author } from "../../domain/entities/Author";
import { Media } from "../../domain/entities/Media";
import { Mediachat, MediachatOptions } from "../../domain/entities/MediaChat";
import { IMediaChatRepository } from "../../domain/repositories/IMediaChatRepository";

export class CreateMediaChat {
  constructor(private mediaChatRepository: IMediaChatRepository) {}
  async execute(
    author: Author,
    duration: number | null,
    media: Media,
    message: string,
    options: MediachatOptions
  ): Promise<Mediachat> {
    const mediaChat = new Mediachat("id", author, duration, message, media, options);
    await this.mediaChatRepository.create(mediaChat);
    return mediaChat;
  }
}
