const { exec } = require("child_process");


function command(media) {
    return new Promise((res, rej) => {
        exec(
            `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${media}
              `,
            (error, stdout, stderr) => {
              if (error) {
                console.error(`[Error] ${error}`);
                rej();
              }
              let Duration = {
                duration: parseInt(stdout),
                minutes: parseInt(stdout/60),
                lastSeconds: parseInt(stdout%60)
              }
              res(Duration);
            }
          );
    })
}

async function getMediaDuration(media) {
  try {
    const result = await command(media);
    return result
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getMediaDuration,
};
