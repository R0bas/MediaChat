import { Author } from "../../domain/entities/Author";
import { MediachatOptions } from "../../domain/entities/MediaChat";

export const getFileContentType = (contentType: string) => {
    if (contentType.includes("image")) {
        return "image";
    }
    if (contentType.includes("video")) {
        return "video";
    }
    if (contentType.includes("audio")) {
        return "sound";
    }
    return "unknown";
    };

export const formatReply = (
    author: Author,
    mediaOptions: MediachatOptions,
    text: string | null,
    url: string | null
): string => {
    return `<@${author.id}> sent ${url ? url : ""} to ${
        mediaOptions.target === "all"
          ? "**everyone**"
          : `<@${mediaOptions.target_id}>`
      } ${url && text ? "with the caption" : ""} ${
        text ? "```" + text + "```" : ""
      }`;
}