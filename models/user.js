const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {
        required : [true, 'Username cannot be empty'],
        type: String
    },
    email: {
        type : String,
        required : [true, 'Email cannot be empty'],
        unique : true,
        lowercase : true,
        validate : [isEmail, 'Please enter a valid email']
    },

    password : {
        type: String,
        required: [true, 'Password cannot be empty'],
        minlength: [6,'Minimum password characters is 6 letters']
    }
})

// fire a function after doc saved to db
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password =  await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model('user', userSchema)

module.exports = User;