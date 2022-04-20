const express = require('express');
const { upload_videos }  = require('../controllers/adminAuthController');

const router = express.Router();

const {uploadFile }= require('../middleware/authMiddleware')


adminAuthController = require('../controllers/adminAuthController')




module.exports = router;