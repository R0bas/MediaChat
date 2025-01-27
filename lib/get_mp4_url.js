const ytdl = require("ytdl-core");
const fs = require("fs");
const { pipeline } = require("stream/promises");

module.exports = async function get_mp4_url(url) {
  return await pipeline(
    ytdl(url, /*{ format: "videoandaudio" }*/),
    fs.createWriteStream("./static/video.mp4")
  );
};
