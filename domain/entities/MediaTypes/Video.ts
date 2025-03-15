import { Media } from "../Media";

export class Video extends Media {
  constructor(
    id: string,
    url: string,
    type: string,
    public readonly duration: number
  ) {
    super(id, url, type);
    validateVideo(this);
    this.duration = duration;
  }
}

const validateVideo = (video: Video) => {
  if (!video.duration) {
    throw new Error("Video duration is required");
  }
};
