const History = require('../models/History');
const User = require('../models/User');

exports.createHistory = async (req, res) => {
  try {
    const { email, url, templateText, fileType, pdfHeader } = req.body;
    if (!email || !url || !templateText || !fileType || !pdfHeader) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email });
      await user.save();
    }
    
    // Create history with user reference
    const history = new History({ 
      user: user._id,
      url, 
      templateText, 
      fileType, 
      pdfHeader 
    });
    await history.save();
    
    // Add history ID to user's history array
    user.history.push(history._id);
    await user.save();
    
    res.status(201).json({ message: 'History created successfully', history });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create history', details: err.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ error: 'Email is required in the URL path' });
    }
    
    const user = await User.findOne({ email }).populate('history');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ histories: user.history });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history', details: err.message });
  }
};

exports.deleteHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await History.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'History not found' });
    }
    
    // Remove history ID from user's history array
    await User.updateMany(
      { history: id },
      { $pull: { history: id } }
    );
    
    res.json({ message: 'History deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete history', details: err.message });
  }
}; 