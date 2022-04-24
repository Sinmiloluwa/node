const Video = require('../models/video')

const get_video = async (req, res) => {
    try {
        const video = await Video.find()
        res.json({data: video})
    }
    catch (err) {
        console.log(err)
    }
    
}

module.exports = {
    get_video
}
