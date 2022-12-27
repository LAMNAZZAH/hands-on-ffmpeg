const { Ffmpeg } = require("../utils/_ffmpeg");

async function mergeMedia(textFile, output) {
  try {
    const mergeCmd = [`-f concat -i ${textFile} -c copy`];
    const result = await Ffmpeg(undefined, output, mergeCmd, addOptions);
  } catch (error) {
    console.error(error);
  }
}


module.exports = {
    mergeMedia
}