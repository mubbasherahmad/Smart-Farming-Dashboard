const mongoose = require('mongoose');

const irrigationScheduleSchema = new mongoose.Schema({
  zone: {
    type: String,
    required: true,
    enum: ['zone1', 'zone2', 'zone3', 'zone4'] // adjust zones as needed
  },
  startTime: {
    type: String, // Could be Date or cron string - using String for flexibility
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true,
    min: 1,
    max: 120 // adjust max duration as needed
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('IrrigationSchedule', irrigationScheduleSchema);