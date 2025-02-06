"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mediachat = void 0;
class Mediachat {
    constructor(id, author, duration, message, media, options, createdAt = new Date()) {
        this.id = id;
        this.author = author;
        this.duration = duration;
        this.message = message;
        this.media = media;
        this.options = options;
        this.createdAt = createdAt;
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
        this.createdAt = createdAt;
    }
}
exports.Mediachat = Mediachat;
const validateMediaChat = (mediachat) => {
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
//# sourceMappingURL=MediaChat.js.map