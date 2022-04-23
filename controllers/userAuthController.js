// require the dependencies
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {email: '', password: '', username: ''}

    // Incorrect Email
    if (err.message === 'Incorrect Email') {
        errors.email = "This email is not registered"
    }

    // Incorrect Password
    if (err.message === 'Pasword is Incorrect') {
        errors.password = "Password is not valid"
    }

    // duplicate error
    if(err.code === 11000) {
        errors.email = "This email already exists";
        return errors;
    }

    // valdation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        });
    }
    return errors
}

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({id}, 'vodeo secret token', {
        expiresIn: maxAge
    })
}

// create authentication functions
const user_signup = async (req, res) => {
    const{email, password, username} = req.body
    try{
        const user = await User.create({email, password, username})
        const token = createToken(user._id)
        res.status(201).json({user: user._id, token: token})
    }
    catch(err) {
        const errors = handleErrors(err)
        res.status(500).json({errors})
    }
}

const user_signin = async (req, res) => {
    const {email, password } = req.body

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({user : user._id, token : token, username: user.username, role: user.role})
    }
    catch(err) {
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}

const user_signout = async (req, res) => {
    res.cookie('jwt','', {maxAge: 1})
    res.send('Done')
}


module.exports = {
    user_signup,
    user_signin,
    user_signout
}