const express = require('express');

const router = express.Router();

userAuthController = require('../controllers/userAuthController')

router.post('/signup',userAuthController.user_signup)
router.post('/login',userAuthController.user_signin)



module.exports = router;