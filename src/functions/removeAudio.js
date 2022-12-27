const { Ffmpeg } = require('../utils/_ffmpeg');

async function removeAudio(media, output, addOptions) {
    try {
        let rmCmd = ["-y -an -c:v copy"]
        const result = await Ffmpeg(media, output, rmCmd, addOptions);
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    removeAudio
}