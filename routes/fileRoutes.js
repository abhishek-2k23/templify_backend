const express = require('express');
const multer = require('multer');
const path = require('path');
const fileController = require('../controllers/fileController');

const router = express.Router();

// Set up multer for file uploads
const upload = multer({ dest: path.join(__dirname, '../uploads/') });

router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/test', fileController.testApi);

module.exports = router; 