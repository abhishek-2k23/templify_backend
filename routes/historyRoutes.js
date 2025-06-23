const express = require('express');
const historyController = require('../controllers/historyController');

const router = express.Router();

router.post('/create', historyController.createHistory);
router.get('/', historyController.getHistory);
router.delete('/:id', historyController.deleteHistory);

module.exports = router; 