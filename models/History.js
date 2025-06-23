const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  url: { type: String, required: true },
  templateText: { type: String, required: true },
  fileType: { type: String, required: true },
  pdfHeader: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('History', historySchema); 