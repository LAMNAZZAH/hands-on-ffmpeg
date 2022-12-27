const { spawn } = require("child_process");
const { spawnOptions } = require('./spawnOptions');

function Ffmpeg(media, output, params, addOptions) {
  if (media) {
    params.unshift(`-i ${media}`);
  }
  if (output) {
    params.push(output);
  }
  const options = spawnOptions(addOptions);
  return new Promise((res, rej) => {
    const ffmpeg = spawn("ffmpeg", params, options);
    ffmpeg.stdout.on("data", (data) => {
      console.log(data.toString());
    });
    ffmpeg.stderr.on("data", (data) => {
      console.log(data.toString());
    });
    ffmpeg.on("error", (err) => {
      rej("[Err]: " + err.message);
    });
    ffmpeg.on("close", (code) => {
      if (code === 1) {
        return console.log("[Failed]: " + code);
      }
      res("[Finished] processed successfully!");
    });
  });
}

module.exports = {
  Ffmpeg
};
