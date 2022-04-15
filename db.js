const mongoose = require('mongoose')

// connect to db
module.exports = {
    connectDb : mongoose.connect("mongodb+srv://Simons:Precious97!@cluster0.ci0ov.mongodb.net/vodeo?retryWrites=true&w=majority")
    .then((result) => console.log('Connected'))
    .catch((err) => console.log(err))
}