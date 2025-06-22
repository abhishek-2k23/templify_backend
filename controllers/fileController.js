const cloudinary = require('../configuration/cloudinary');
const File = require('../models/File');

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'uploads',
    });
    const file = new File({
      filename: req.file.originalname,
      url: result.secure_url,
    });
    await file.save();
    res.status(201).json({ message: 'File uploaded successfully', file });
  } catch (err) {
    res.status(500).json({ error: 'File upload failed', details: err.message });
  }
};

exports.testApi = (req, res) => {
  res.json({ message: 'API is working!' });
}; 