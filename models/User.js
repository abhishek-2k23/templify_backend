const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'History' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema); 