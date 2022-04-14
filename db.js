const mongoose = require('mongoose')

// connect to db
module.exports = {
    connectDb : mongoose.connect('mongodb://localhost:27017/streaming', {useNewUrlParser : true, useUnifiedTopology: true})
    .then((result) => console.log('Connected'))
    .catch((err) => console.log(err))
}