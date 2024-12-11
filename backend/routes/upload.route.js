const express = require('express');
const { upload, uploadController } = require('../controllers/upload.controller');

const router = express.Router();

router.post('/', uploadController);

module.exports = router