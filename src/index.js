const { trimMedia } = require("./functions/trimMedia");
const { removeAudio } = require("./functions/removeAudio");
const { videoToGif } = require('./functions/videoToGif');
const { getVideoDuration } = require('./functions/getMediaDuration');
const { combineMedia } = require('./functions/combineMedia');


/*  removeAudio("../videos/saad.mp4", "../videos/silentSaad.mp4").then(() => {
  trimMedia(
    "../videos/silentSaad.mp4",
    "../videos/saadResult.mp4",
    `01:45`,
    "00:08"
  ).then(() => {
    videoToGif("../videos/saadResult.mp4", "../videos/mygif.gif")
  })
}); 
 */

combineMedia("../videos/saad.mp4", "", 08, 30).then(() => {
  console.log("done");
});