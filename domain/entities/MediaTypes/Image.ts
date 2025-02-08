import { Media } from "../Media";

export class Image extends Media {
  constructor(
    id: string,
    url: string,
    type: string,
    public readonly width: number,
    public readonly height: number
  ) {
    super(id, url, type);
    validateImage(this);
    this.width = width;
    this.height = height;
  }
}

const validateImage = (image: Image) => {
  if (!image.width) {
    throw new Error("Image width is required");
  }
  if (!image.height) {
    throw new Error("Image height is required");
  }
};
