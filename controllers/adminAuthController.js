const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Video = require('../models/video')
const formidable = require('formidable')
const fs = require('fs')
const { getVideoDurationInSeconds } = require('get-video-duration')
const path = require('path')
const cloudinary = require('cloudinary')

const upload_videos = async (req, res) => {
    const formData = new formidable.IncomingForm()
    formData.maxFileSize = 1000 * 1024 * 1024
    formData.parse(req, (err, fields, files) => {
        const title = fields.title
        const description =  fields.description
        const category =  fields.category

        const oldThumbnailPath = files.thumbnail.filepath

        const oldVideoPath= files.video.filepath

        const newThumbnailPath = "public/thumbnails/" + new Date().getTime() + "-" + files.thumbnail.originalFilename

        const newVideoPath = "public/videos/" + new Date().getTime() + "-" + files.video.originalFilename

        cloudinary.v2.uploader.upload(oldVideoPath, 
  { resource_type: "video", 
    public_id: "vodio/videos/" + files.video.originalFilename,
    chunk_size: 6000000,
    eager: [
      { width: 300, height: 300, crop: "pad", audio_codec: "none" }, 
      { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" } ],                                   
    eager_async: true,
    eager_notification_url: "https://mysite.example.com/notify_endpoint" },
  function(error, result) {console.log(result, error)});

  cloudinary.v2.uploader.upload(oldThumbnailPath, 
    function(error, result) {console.log(result, error)});

            fs.rename(oldVideoPath, newVideoPath, (error) => {
              const currentTime =  new Date().getTime()

            // video duration
            getVideoDurationInSeconds(newVideoPath, '/node_modules/@ffprobe-installer/win32-x64/ffprobe').then((duration) => {
                const hours  = Math.floor(duration/60/60)
                const minutes = Math.floor(duration/60) - (hours * 60)
                const seconds = Math.floor(duration % 60)
                // insert into database
                // const {video, thumbnail, category, description, title} = req.body
    
                    const video = Video.create({videoPath : newVideoPath, thumbnailPath : newThumbnailPath, category, description, title, hours, minutes, seconds})
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