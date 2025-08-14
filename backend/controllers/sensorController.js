const SensorReading = require('../models/SensorReading');
const { validationResult } = require('express-validator');

// @desc    Create a new sensor reading
// @route   POST /api/sensors
// @access  Private
const createSensorReading = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { sensorId, type, value, location } = req.body;

  try {
    const reading = await SensorReading.create({
      sensorId,
      type,
      value,
      location
    });

    res.status(201).json(reading);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createSensorReading
};