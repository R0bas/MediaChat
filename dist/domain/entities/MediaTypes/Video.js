"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = void 0;
const Media_1 = require("../Media");
class Video extends Media_1.Media {
    constructor(id, url, type, duration) {
        super(id, url, type);
        this.duration = duration;
        validateVideo(this);
        this.duration = duration;
    }
}
exports.Video = Video;
const validateVideo = (video) => {
    if (!video.duration) {
        throw new Error("Video duration is required");
    }
};
//# sourceMappingURL=Video.js.map