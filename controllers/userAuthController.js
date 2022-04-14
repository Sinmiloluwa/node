// require the user model
const User = require('../models/user')

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {email: '', password: '', username: ''}

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

// create authentication functions
const user_signup = async (req, res) => {
    const{email, password, username} = req.body
    try{
        const user = await User.create({email, password})
        res.status(201).json(user)
    }
    catch(err) {
        const errors = handleErrors(err)
        res.status(500).json({errors})
    }
}

const user_signin = (req, res) => {
    res.send("signin")
}


module.exports = {
    user_signup,
    user_signin
}