const express = require('express');

const router = express.Router();

userAuthController = require('../controllers/userAuthController')

router.post('/signup',userAuthController.user_signup)
router.post('/signin',userAuthController.user_signin)
router.get('/signout',userAuthController.user_signout)


module.exports = router;