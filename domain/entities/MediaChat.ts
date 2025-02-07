import { Author } from "./Author";
import { Media } from "./Media";

export interface MediachatOptions {
  file: {
    positionX: "left" | "center" | "right";
    positionY: "top" | "center" | "bottom";
  };
  text: {
    positionX: "left" | "center" | "right";
    positionY: "top" | "center" | "bottom";
    color: string;
    fontSize: number;
    fontFamily: string;
  };
  hideAuthor: boolean;
}

export class Mediachat {
  constructor(
    public readonly id: string,
    public readonly author: Author,
    public readonly duration: number,
    public readonly message?: string,
    public readonly media?: Media,
    public readonly options?: MediachatOptions,
    public readonly target?: string,
    public readonly createdAt: Date = new Date()
  ) {
    validateMediaChat(this);
    this.id = id;
    this.author = author;
    this.duration = duration;
    if (!target) {
      this.target = "all";
    }
    if (target) {
      this.target = target;
    }
    if (message) {
      this.message = message;
    }
    if (media) {
      this.media = media;
    }
    if (!options) {
      this.options = {
        file: {
          positionX: "center",
          positionY: "center",
        },
        text: {
          positionX: "center",
          positionY: "bottom",
          color: "#000000",
          fontSize: 16,
          fontFamily: "Arial",
        },
        hideAuthor: false,
      };
    }
    if (options) {
      this.options = options;
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
