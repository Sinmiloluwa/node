const Video = require('../models/video')
const cloudinary = require("cloudinary");

const get_video = async (req, res) => {
    try {
        const {resources} = await cloudinary.v2.search.expression('resource_type:video AND folder:vodio/videos')
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute()
        const publicIds = resources.map((file) => file.public_id)
        res.json({data: publicIds})
    }
    catch (err) {
        console.log(err)
    }
    
}



module.exports = {
    get_video,
}
