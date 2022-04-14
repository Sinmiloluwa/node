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

// middleware
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 3000;
if(connectDb) {
    app.listen(PORT)
    console.log("Listening on Port")
}


app.get('/set-cookies', (req, res) =>  {
    // res.setHeader('set-cookie', 'newUser=true');

    res.cookie('newUser', false, ({maxAge: 1000 * 60 * 60 * 24}))
    res.cookie('isAdmin', true)

    res.send('you set the cookies')
})

app.get('/read-cookies', (req, res) => {
    const cookies = req.cookies
    res.json(cookies)
})


app.use(userRoutes)
app.use(authRoutes)
