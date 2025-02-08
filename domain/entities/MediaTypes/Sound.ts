import { Media } from "../Media";

export class Sound extends Media {
  constructor(id: string, url: string, type:string, public readonly duration: number) {
    super(id, url, type);
    validateSound(this);
    this.duration = duration;
  }
}

const validateSound = (sound: Sound) => {
  if (!sound.duration) {
    throw new Error("Sound duration is required");
  }
};
