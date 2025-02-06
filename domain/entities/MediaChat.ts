import { Author } from "./Author";
import { Media } from "./Media";

export interface MediachatOptions {
  id: string;

export class Mediachat {
  constructor(
    public readonly id: string,
    public readonly author: Author,
    public readonly duration: number,
    public readonly message?: string,
    public readonly media?: Media,
    public readonly options?: string[],
    public readonly createdAt: Date = new Date()
  ) {
    validateMediaChat(this);
    this.id = id;
    this.author = author;
    this.duration = duration;
    if (message) {
      this.message = message;
    }
    if (media) {
      this.media = media;
    }
    this.createdAt = createdAt;
  }
}

const validateMediaChat = (mediachat: Mediachat) => {
  if (!mediachat.author) {
    throw new Error("Author is required");
  }
  if (!mediachat.duration) {
    throw new Error("Duration is required");
  }
  if (!mediachat.message && !mediachat.media) {
    throw new Error("Message or media is required");
  }
};
