const express = require('express');
const { upload_videos }  = require('../controllers/adminAuthController');

const router = express.Router();

const {checkAdmin}= require('../middleware/authMiddleware')


const adminAuthController = require('../controllers/adminAuthController')

router.post('/admin/upload', checkAdmin, adminAuthController.upload_videos)

module.exports = router;