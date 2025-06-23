const express = require('express');
const multer = require('multer');
const path = require('path');
const fileController = require('../controllers/fileController');

const router = express.Router();

// Set up multer for file uploads
const upload = multer({ 
  dest: path.join(__dirname, '../uploads/'),
  fileFilter: (req, file, cb) => {
    const allowedExt = ['.pdf', '.txt', '.xls', '.doc'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExt.includes(ext)) {
      return cb(new Error('Only PDF, TXT, XLS, and DOC files are allowed'), false);
    }
    cb(null, true);
  }
});

router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/list', fileController.listFiles);
router.post('/update', upload.single('file'), fileController.updateFile);
router.post('/delete', fileController.deleteFile);
router.get('/test', fileController.testApi);

module.exports = router; 