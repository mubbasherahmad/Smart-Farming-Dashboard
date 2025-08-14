const mongoose = require('mongoose');

const sensorReadingSchema = new mongoose.Schema({
  sensorId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['temperature', 'humidity', 'soil_moisture', 'light']
  },
  value: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  location: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SensorReading', sensorReadingSchema);