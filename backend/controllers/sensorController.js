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

const getSensorReadings = async (req, res) => {
  try {
    const readings = await SensorReading.find({})
      .sort({ timestamp: -1 })
      .limit(50);
    res.json(readings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
const updateSensorReading = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body; // e.g. { sensorId, type, value, location }

    const updated = await SensorReading.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Sensor not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating sensor", error });
  }
};
const deleteSensorReading = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await SensorReading.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({ message: "Sensor not found" });
    }
    
    res.json({ message: "Sensor deleted successfully", id });
  } catch (error) {
    res.status(500).json({ message: "Error deleting sensor", error });
  }
};

// Add to exports
module.exports = {
  createSensorReading,
  getSensorReadings,
  updateSensorReading,
  deleteSensorReading,
};