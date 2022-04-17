// require Express
const express = require('express')

// require db modules
const {connectDb} = require('./db')

// require cookie parser
const cookieParser = require('cookie-parser')

// require routes
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')

// call express app
const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept")
    res.header('Access-Control-Allow-Credentials','true')
    next();
});

// middleware
app.use(express.json())
app.use(cookieParser())





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

const port = process.env.PORT || 8000;
app.listen(port)
console.log(`Listening on Port ${port}`)


app.use(userRoutes)
app.use(authRoutes)
