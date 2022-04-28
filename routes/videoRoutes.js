const express = require('express');

const router = express.Router();

videoController = require('../controllers/videoController')

router.get('/videos', videoController.get_video)




module.exports = router;