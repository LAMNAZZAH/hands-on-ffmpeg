const ffmpeg = require('fluent-ffmpeg');
const os = require('os');

if (os.platform() === 'win32') {
  var ffmpegPath = 'C:/PATH_files/ffmpeg.exe'
} else {
  var ffmpegPath = 'C:/PATH_files/ffmpeg'
}

const command = ffmpeg();
command.setFfmpegPath(ffmpegPath);

/* function getDimentions(media) {
  console.log("Getting Dimentions from:", media);
  return new Promise((res, rej) => {
    ffmpeg.ffprobe(media, async function (err, metadata) {
      if (err) {
        console.log("Error occured while getting dimensions of:", media);
        rej(err);
      }
      res({
        width: metadata.streams[0].width,
        height: metadata.streams[0].height,
      });
    });
  });
}
 */
// command to impelement
/* ffmpeg -i ../videos/video2.mp4 -y -f lavfi -i  color=c=white:s=1920x1080:r=24 -filter_complex [1:v][0:v]overlay=shortest=1  -acodec copy ../videos/temp1.mp4 */

function resizeMedia(media, tempFile) {
  return new Promise((res, rej) => {
    //ffmpeg -i ../videos/video2.mp4 -y
    let cmd = command.input(media).outputOptions([
      '-f lavfi -i color=c=white:s=1920x1080:r=24',
      '-filter_complex [1:v][0:v]overlay=shortest=1',
      '-acodec copy',
    ]);
    cmd.output(tempFile)
      .on('start', (commandLine) => {
        console.log("ffmpeg command: " + commandLine);
        console.log("[start] Resizing", media);
      })
      .on('error', (err) => {
        console.log("[Err] a problem happened while resizing");
        rej(err);
      })
      .on('end', () => {
        console.log("[Finished] Resizing: ", tempFile);
        res();
      })
      .run()
  })
}

resizeMedia('../videos/video2.mp4', '../videos/temp1.mp4');

/* getDimentions('../videos/video2.mp4').then((result) => {
  console.log(result);
});
 */

/* command
  .input('../images/image2.jpg')
  .loop(1)
  .aspect("9:16")
  .videoFilter(`zoompan=z=\'if(lte(zoom,1.0),1.5,max(1.001,zoom-0.0015))\':d=1000:x=iw/2-(iw/zoom/2):y=ih/2-(ih/zoom/2):fps=30,drawtext=text=\'My Text Overlay\':x=2:y=20`)
  .duration(7)
  .output('../output/video.mp4')
  .on('end', () => {
    console.log(`[*] Finished Processing!`);
  })
  .run() */