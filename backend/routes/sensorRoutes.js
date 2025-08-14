const express = require('express');
const { createSensorReading } = require('../controllers/sensorController');
const { protect } = require('../middleware/authMiddleware');
const { sensorReadingValidator } = require('../middleware/sensorValidators');
const { getSensorReadings } = require('../controllers/sensorController');
const router = express.Router();

router.post('/', protect, sensorReadingValidator, createSensorReading);
router.get('/', protect, getSensorReadings);
module.exports = router;