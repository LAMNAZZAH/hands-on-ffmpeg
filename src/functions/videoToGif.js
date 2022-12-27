const { Ffmpeg } = require("../utils/_ffmpeg");

async function videoToGif(media, output, addOptions) {
  try {
    const toGifCmd = [
      "-y -vf ",
      '"fps=10,scale=720:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse"',
    ];
    const result = await Ffmpeg(media, output, toGifCmd, addOptions);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
    videoToGif
}
