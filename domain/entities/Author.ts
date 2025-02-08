export class Author {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly image?: string
  ) {
    validateAuthor(this);
    this.id = id;
    this.name = name;
    if (image) {
      this.image = image;
    }
  }
}

const validateAuthor = (author: Author) => {
  if (!author.name) {
    throw new Error("Author name is required");
  }
};
