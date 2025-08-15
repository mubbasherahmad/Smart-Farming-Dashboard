// const express = require('express');
// const { createSensorReading } = require('../controllers/sensorController');
// const { protect } = require('../middleware/authMiddleware');
// const { sensorReadingValidator } = require('../middleware/sensorValidators');
// const { getSensorReadings } = require('../controllers/sensorController');
// const router = express.Router();

// router.post('/', protect, sensorReadingValidator, createSensorReading);
// router.get('/', protect, getSensorReadings);
// // PUT /api/sensors/:id


// module.exports = router;

const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { sensorReadingValidator } = require("../middleware/sensorValidators");
const {
  createSensorReading,
  getSensorReadings,
  updateSensorReading,
} = require("../controllers/sensorController");

const router = express.Router();

// Create new reading
router.post("/", protect, sensorReadingValidator, createSensorReading);

// Get all readings
router.get("/", protect, getSensorReadings);

// Update sensor metadata
router.put("/:id", protect, updateSensorReading);

module.exports = router;
