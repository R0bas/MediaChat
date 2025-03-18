import { Author } from "./Author";
import { Media } from "./Media";


export interface PositionX {
  positionX: "left" | "center" | "right";
}
export interface PositionY {
  positionY: "top" | "center" | "bottom";
}
export interface MediachatOptions {
  file?: {
    positionX: PositionX;
    positionY: PositionY;
  };
  text: {
    positionX: PositionX;
    positionY: PositionY;
    color: string;
    fontSize: number;
    fontFamily: string;
  };
  hideAuthor?: boolean;
  target?: string;
}

export class Mediachat {
  constructor(
    public readonly id: string,
    public readonly author: Author,
    public readonly duration: number | null,
    public readonly message?: string,
    public readonly media?: Media,
    public readonly options?: MediachatOptions,
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
    if (!options) {
      this.options = {
        file: {
          positionX: "center" as unknown as PositionX,
          positionY: "center" as unknown as PositionY,
        },
        text: {
          positionX: "center" as unknown as PositionX,
          positionY: "bottom" as unknown as PositionY,
          color: "#000000",
          fontSize: 16,
          fontFamily: "Arial",
        },
        hideAuthor: false,
        target: "all",
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
  if (!mediachat.message && !mediachat.media) {
    throw new Error("Message or media is required");
  }
};
