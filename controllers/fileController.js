const cloudinary = require('../configuration/cloudinary');
const File = require('../models/File');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

exports.uploadFile = async (req, res) => {
  try {
    const { email } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    // Ensure user exists
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email });
      await user.save();
    }
    const uploadPublicId = `uploads/${req.file.originalname}`;
    // Try to delete any existing file with the same public_id
    try {
      await cloudinary.uploader.destroy(uploadPublicId, { resource_type: 'raw' });
    } catch (e) {
      // Ignore if not found
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'raw',
      public_id: uploadPublicId
    });
    // Remove local file after upload
    fs.unlinkSync(req.file.path);
    const file = new File({
      filename: req.file.originalname,
      url: result.secure_url,
      userEmail: email,
    });
    await file.save();
    res.status(201).json({ message: 'File uploaded successfully', file });
  } catch (err) {
    res.status(500).json({ error: 'File upload failed', details: err.message });
  }
};

exports.listFiles = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    const files = await File.find({ userEmail: email });
    res.json({ files });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch files', details: err.message });
  }
};

exports.updateFile = async (req, res) => {
  try {
    const { fileId, email } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    if (!fileId || !email) {
      return res.status(400).json({ error: 'fileId and email are required' });
    }
    const fileDoc = await File.findOne({ _id: fileId, userEmail: email });
    if (!fileDoc) {
      return res.status(404).json({ error: 'File not found' });
    }
    // Delete old file from cloudinary
    const updatePublicId = `uploads/${req.file.originalname}`;
    await cloudinary.uploader.destroy(updatePublicId, { resource_type: 'raw' });
    // Upload new file
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'raw',
      public_id: updatePublicId
    });
    fs.unlinkSync(req.file.path);
    fileDoc.filename = req.file.originalname;
    fileDoc.url = result.secure_url;
    await fileDoc.save();
    res.json({ message: 'File updated successfully', file: fileDoc });
  } catch (err) {
    res.status(500).json({ error: 'File update failed', details: err.message });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const { fileId, email } = req.body;
    if (!fileId || !email) {
      return res.status(400).json({ error: 'fileId and email are required' });
    }
    const fileDoc = await File.findOne({ _id: fileId, userEmail: email });
    if (!fileDoc) {
      return res.status(404).json({ error: 'File not found' });
    }
    // Delete from cloudinary
    const deletePublicId = `uploads/${fileDoc.filename}`;
    await cloudinary.uploader.destroy(deletePublicId, { resource_type: 'raw' });
    await fileDoc.deleteOne();
    res.json({ message: 'File deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'File delete failed', details: err.message });
  }
};

exports.testApi = (req, res) => {
  res.json({ message: 'API is working!' });
}; 