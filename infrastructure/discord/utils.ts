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