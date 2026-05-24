const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth');
const asyncHandler = require('../middleware/asyncHandler');
const statsController = require('../controllers/stats.controller');

router.get('/dashboard', authMiddleware, asyncHandler(statsController.dashboard));

module.exports = router;
