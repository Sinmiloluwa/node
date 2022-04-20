const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { isEmail } = require('validator')
const bcrypt = require('bcryptjs')

const videoSchema = new Schema({
    name : {
        type : String,
        required : [true, 'Name cannot be empty']
    },
    file : {
        type : String
    }
})