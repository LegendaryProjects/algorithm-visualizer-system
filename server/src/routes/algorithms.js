import express from 'express';
import * as algorithmController from '../controllers/algorithmController.js';

const router = express.Router();

// @route   GET api/algorithms
// @desc    Get all algorithms and their input schemas
// @access  Public
router.get('/', algorithmController.getAlgorithms);

export default router;
