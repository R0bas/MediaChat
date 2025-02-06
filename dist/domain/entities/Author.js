"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
class Author {
    constructor(id, name, image) {
        this.id = id;
        this.name = name;
        this.image = image;
        validateAuthor(this);
        this.id = id;
        this.name = name;
        if (image) {
            this.image = image;
        }
    }
}
exports.Author = Author;
const validateAuthor = (author) => {
    if (!author.name) {
        throw new Error("Author name is required");
    }
};
//# sourceMappingURL=Author.js.map