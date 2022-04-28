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
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, x-access-token")
    res.header('Access-Control-Allow-Credentials','true')

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, PUT, DELETE, PATCH, GET')
        return res.status(200).json({})
    }
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
      'x-access-token'
    ],
  };
  
  app.use(cors(corsOpts));

// middleware
app.use(cookieParser())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
app.use(express.json())
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

