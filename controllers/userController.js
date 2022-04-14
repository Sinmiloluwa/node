// require the model
const User = require('../models/user')

// create respective functions

const user_index = (req, res) => {
    res.send("Obviously")
}



module.exports = {
    user_index
}