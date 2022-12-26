function resizeMedia(media) {
    return new Promise((res, rej) => {
      const ffmpeg = spawn("ffmpeg", [
        "-i",
        `${media}`,
        "-y -f lavfi",
        "-i",
        "color=c=white:s=1920x1080:r=24",
        "-filter_complex",
        "[1:v][0:v]overlay=shortest=1",
        "-acodec",
        "copy",
        "../videos/temp4.mp4",    
      ], options);
      ffmpeg.stdout.on("data", data => {
          console.log(data.toString());
      })
      ffmpeg.stderr.on("data", data => {
          console.log(data.toString());
        });
      ffmpeg.on("error", (err) => {
        rej("[Err]: " + err.message);
      });
      ffmpeg.on("close", (code) => {
        if (code === 1) {
          return console.log("[Failed]: " + code);
        }
        res("[Finished] processed successfully!")
      });
    });
  }

  module.exports = resizeMedia;