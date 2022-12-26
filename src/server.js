const { spawn } = require("child_process");

const options = {
  shell: true,
};

params = [
  "-i ../videos/video1.mp4 -y",
  "-f lavfi -i color=c=purple:s=1920x1080:r=24",
  "-filter_complex [1:v][0:v]overlay=shortest=1:x='(main_w-overlay_w)/2':y='(main_h-overlay_h)/2':enable='between(t,0,4)'",
  "-acodec copy ../videos/temp7.mp4",
];

function resizeMedia(media) {
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

resizeMedia("something")
  .then((mssg) => console.log(mssg))
  .catch((err) => console.log(err));