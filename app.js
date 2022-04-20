// require Express
const express = require('express')
const Grid = require('gridfs-stream');
const multer = require('multer')
const crypto = require('crypto')
const {GridFsStorage} = require('multer-gridfs-storage')
const path = require('path')

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
const {requireAuth, checkAdmin} = require('./middleware/authMiddleware')






app.get('/set-cookies', (req, res) =>  {
    // res.setHeader('set-cookie', 'newUser=true');

    res.cookie('newUser', false, ({maxAge: 1000 * 60 * 60 * 24}))
    res.cookie('isAdmin', true)

    res.send('you set the cookies')
})

app.get('/read-cookie', (req, res) => {
    const cookies = req.cookies
    res.json(cookies)
})

app.get('/', (req, res) => {
    res.send('Hello world!')
})


app.get('/admin', checkAdmin, (req, res) => {
    res.send('Always')
})

let gfs;



// storage Engine
const storage = new GridFsStorage({
    url: "mongodb+srv://Simons:Precious97!@cluster0.ci0ov.mongodb.net/vodeo?retryWrites=true&w=majority",
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'videos'
          };
          resolve(fileInfo);
        });
      });
    }
  });
 const uploadFile = multer({ storage });

app.post('/video-upload', uploadFile.single('file'), (req,res) => {
    res.json({name : req.body, file: req.file})
})  


const port = process.env.PORT || 8000;
app.listen(port)
console.log(`Listening on Port ${port}`)


app.use(userRoutes)
app.use(authRoutes)

