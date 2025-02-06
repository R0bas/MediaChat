"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = void 0;
class Media {
    constructor(id, url, type) {
        this.id = id;
        this.url = url;
        this.type = type;
        validateMedia(this);
        this.id = id;
        this.url = url;
        this.type = type;
    }
}
exports.Media = Media;
const validateMedia = (media) => {
    if (!media.url) {
        throw new Error("Media url is required");
    }
    if (!media.type) {
        throw new Error("Media type is required");
    }
};
//# sourceMappingURL=Media.js.map