const History = require('../models/History');

exports.createHistory = async (req, res) => {
  try {
    const { url, templateText, fileType, pdfHeader } = req.body;
    if (!url || !templateText || !fileType || !pdfHeader) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const history = new History({ url, templateText, fileType, pdfHeader });
    await history.save();
    res.status(201).json({ message: 'History created successfully', history });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create history', details: err.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(200).json({ message: 'No history found' });
    }
    const histories = await History.find({ url: { $regex: email, $options: 'i' } }).sort({ createdAt: -1 });
    res.json({ histories });
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
    res.json({ message: 'History deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete history', details: err.message });
  }
}; 