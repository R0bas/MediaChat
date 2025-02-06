"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sound = void 0;
const Media_1 = require("../Media");
class Sound extends Media_1.Media {
    constructor(id, url, type, duration) {
        super(id, url, type);
        this.duration = duration;
        validateSound(this);
        this.duration = duration;
    }
}
exports.Sound = Sound;
const validateSound = (sound) => {
    if (!sound.duration) {
        throw new Error("Sound duration is required");
    }
};
//# sourceMappingURL=Sound.js.map