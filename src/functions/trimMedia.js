const { Ffmpeg } = require("../utils/_ffmpeg");

async function trimMedia(media, output, start, duration, addOptions) {
    try {
        const trimCmd = [`-y -ss ${start}`, `-t ${duration}`, `-acodec copy -f mp4`]
        const result = await Ffmpeg(media, output, trimCmd, addOptions);
        console.log(result);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    trimMedia
}