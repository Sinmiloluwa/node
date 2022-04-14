const express = require('express');

const router = express.Router();

userController = require('../controllers/userController')

router.get('/', userController.user_index)


module.exports = router;