"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const Media_1 = require("../Media");
class Image extends Media_1.Media {
    constructor(id, url, type, width, height) {
        super(id, url, type);
        this.width = width;
        this.height = height;
        validateImage(this);
        this.width = width;
        this.height = height;
    }
}
exports.Image = Image;
const validateImage = (image) => {
    if (!image.width) {
        throw new Error("Image width is required");
    }
    if (!image.height) {
        throw new Error("Image height is required");
    }
};
//# sourceMappingURL=Image.js.map