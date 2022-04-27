// require Express
const express = require('express')
const path = require('path')
const cloudinary = require("cloudinary");
require('dotenv').config()


// require cors
const cors = require('cors')

// require db modules
const {connectDb} = require('./db')

// require cookie parser
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// require routes
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const videoRoutes = require('./routes/videoRoutes')

// call express app
const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept")
    res.header('Access-Control-Allow-Credentials','true')
    next();
});
const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
  
  app.use(cors(corsOpts));

// middleware
app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
const {requireAuth, checkAdmin} = require('./middleware/authMiddleware')


cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET
})



const port = process.env.PORT || 5000;
app.listen(port)
console.log(`Listening on Port ${port}`)


app.use(userRoutes)
app.use(authRoutes)
app.use(adminRoutes)
app.use(videoRoutes)

