const User = require('../models/user')
const jwt = require('jsonwebtoken')

const upload_videos = async (req, res) => {
    res.json({file: req.file})
}

module.exports = {
    upload_videos
}