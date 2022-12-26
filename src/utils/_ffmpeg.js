const { spawn } = require("child_process");
const { spawnOptions } = require('./spawnOptions');

const options = spawnOptions();

myParams = [
  "-i ../../videos/video1.mp4",
  "-i ../../videos/video2.mp4",
  "-map 0:a -map 1:v",
  "-c:v h264 -c:a aac",
  "",
  "../../videos/result.mp4"
];

function Ffmpeg(params, options) {
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

async function turnOffAudio() {
  try {
    const result = await Ffmpeg(myParams, options);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

turnOffAudio();
