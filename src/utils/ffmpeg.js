const { spawn } = require("child_process");

let options = {
  shell: true,
};

let params = [
  "-i ../videos/video2.mp4 -y",
  "-f lavfi -i color=c=red:s=1920x1080:r=24",
  "-filter_complex [1:v][0:v]overlay=shortest=1:x='(main_w-overlay_w)/2':y='(main_h-overlay_h)/2':enable='between(t,0,4)'",
  "-acodec copy ../videos/temp10.mp4",
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

Ffmpeg(params, options)
  .then((mssg) => console.log(mssg))
  .catch((err) => console.log(err));
