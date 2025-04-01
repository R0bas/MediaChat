export interface Author {
  id: string
  name: string,
  image?: string
}
export interface Media {
  id: string
  url: string
  type: string
}
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
  target_id?: string;
}

export interface MediaChat {
  id: string
  author: Author
  duration: number | null
  message?: string
  media?: Media
  options?: MediachatOptions
  createdAt: Date
}
