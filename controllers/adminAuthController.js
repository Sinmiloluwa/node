const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Video = require('../models/video')
const formidable = require('formidable')
const fs = require('fs')
const {getVideoDurationInSeconds} = require('get-video-duration')
const path = require('path')

const upload_videos = async (req, res) => {
    const formData = new formidable.IncomingForm()
    formData.maxFileSize = 1000 * 1024 * 1024
    formData.parse(req, (err, fields, files) => {
        const title = fields.title
        const description =  fields.description
        const category =  fields.category

        const thumbnail = "public/thumbnails/" + new Date().getTime() +"-" + files.thumbnail.originalFilename

        const oldVideoPath= files.video.filepath
        const videoPath = "public/videos/" + new Date().getTime() + "-" + files.video.originalFilename

        fs.rename(oldVideoPath, videoPath, (err) => {
            const currentTime =  new Date().getTime()

            // video duration
            getVideoDurationInSeconds(videoPath, '/node_modules/@ffprobe-installer/win32-x64/ffprobe').then((duration) => {
                const hours  = Math.floor(duration/60/60)
                const minutes = Math.floor(duration/60) - (hours * 60)
                const seconds = Math.floor(duration % 60)
                // insert into database
                // const {video, thumbnail, category, description, title} = req.body
    
                    const video = Video.create({videoPath, thumbnail, category, description, title, hours, minutes, seconds})
                    console.log(video)
                    video.then ((data) => {
                        res.status(200).json({video : data})
                    })
                })  
            
            
    })
})
}


module.exports = {
    upload_videos
}