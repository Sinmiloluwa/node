const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

const requireAuth = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    console.log(token)

    // check if token exists and verified 
    if (token) {
        jwt.verify(token, 'vodeo secret token', (err, decodedToken) => {
            if(err) {
                console.log(err);
                res.redirect('/signin')
            } else {
                next();
                console.log(decodedToken);
            }
        })
    }
    else {
        res.redirect('/signin')
    }
}

// check current user
const checkAdmin = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (token) {
        jwt.verify(token, 'vodeo secret token', async (err, decodedToken) => {
            if(err) {
                console.log(err);
                res.locals.user = null
                next()
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id)
                console.log(user.role)
                if(user.role === 'admin') {
                    res.locals.user = user
                    next()
                } else {
                    res.json({message : "You do not have access to this page"})
                }
            }
        })
    }
    else {
        res.locals.user = null
        next()
    }
}

module.exports = {
    requireAuth,
    checkAdmin
}