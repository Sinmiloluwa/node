const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { isEmail } = require('validator')
const bcrypt = require('bcryptjs')

const videoSchema = new Schema({
    title : {
        type : String,
        required : [true, 'Title cannot be empty']
    },
    videoPath : {
        type : String
    },
    description : {
        type: String
    },
    category : [{
        type : String,
        required: true
    }],
    thumbnailPath : {
        type: String,
        required: true
    },
    hours : {
        type : String
    }, 
    minutes : {
        type :  String
    }, 
    seconds : {
        type :  String
    }
   
},{ timestamp : true}) 

const Video = mongoose.model('Video',videoSchema)

module.exports = Video
