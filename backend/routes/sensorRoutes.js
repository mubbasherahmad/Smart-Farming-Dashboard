const express = require('express');
const { createSensorReading } = require('../controllers/sensorController');
const { protect } = require('../middleware/authMiddleware');
const { sensorReadingValidator } = require('../middleware/sensorValidators');
const router = express.Router();

router.post('/', protect, sensorReadingValidator, createSensorReading);

module.exports = router;