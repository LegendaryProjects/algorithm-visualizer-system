const express = require('express');
const router = express.Router();
const algorithmController = require('../controllers/algorithmController');

// @route   GET api/algorithms
// @desc    Get all algorithms and their input schemas
// @access  Public
router.get('/', algorithmController.getAlgorithms);

module.exports = router;
