const jwt = require('jsonwebtoken')

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

module.exports = {
    requireAuth
}