const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./configuration/db');
const fileRoutes = require('./routes/fileRoutes');
const historyRoutes = require('./routes/historyRoutes');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

dotenv.config();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/files', fileRoutes);
app.use('/api/history', historyRoutes);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 