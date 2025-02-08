export abstract class Media {
  constructor(public readonly id: string, public readonly url: string, public readonly type: string) {
    validateMedia(this);
    this.id = id;
    this.url = url;
    this.type = type;
  }
}
const validateMedia = (media: Media) => {
  if (!media.url) {
    throw new Error("Media url is required");
  }
  if (!media.type) {
    throw new Error("Media type is required");
  }
};
