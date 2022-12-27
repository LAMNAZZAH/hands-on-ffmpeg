const { Ffmpeg } = require("../utils/_ffmpeg");
const fs = require("fs");

const { trimMedia } = require("../functions/trimMedia");
const { getMediaDuration } = require("../functions/getMediaDuration");
const { removeAudio } = require("../functions/removeAudio");

function randomValue(max) {
  let random = Math.floor(Math.random() * max).toString();
  if (parseInt(random) < 10) {
    random = "0" + random;
  }
  return random;
}

async function generateTiming(minutes, lastSeconds, divisionLength) {
  try {
    let minute = randomValue(minutes + 1);
    let second;
    if (parseInt(minute) == minutes) {
      maxSec = lastSeconds - divisionLength;
      if (maxSec > 0) {
        second = randomValue(maxSec);
      } else {
        minute -= 1;
        second = randomValue(60);
      }
    } else {
      second = randomValue(60);
    }
    return `${minute}:${second}`;
  } catch (error) {
    console.error(error);
  }
}

async function createTemp(folder, trimRecord) {
  try {
    fs.mkdirSync(folder, (error) => {
      if (error) {
        console.error(error);
      }
    });
    fs.writeFileSync(`${folder}/${trimRecord}`, "", "utf-8");
  } catch (error) {
    console.error(error);
  }
}

async function combineMedia(media, output, maxDivisionLength, length) {
  try {
    createTemp("./toMerge", "record.txt");
    let silentMedia = "./toMerge/silentMedia.mp4";
    await removeAudio(media, silentMedia);
    const Duration = await getMediaDuration(media);
    if (length > Duration.duration) {
      return console.error("[Error]: length exceeds video length!");
    }
    let reachedDuration = 0;
    while (length >= reachedDuration + maxDivisionLength) {
      const start = await generateTiming(
        Duration.minutes,
        Duration.lastSeconds,
        maxDivisionLength
      );
      let index = 00;
      await trimMedia(
        silentMedia,
        `./toMerge/${index}.mp4`,
        `${start}`,
        `00:${maxDivisionLength}`
      );
      reachedDuration += maxDivisionLength;
      index++;
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  combineMedia,
};
