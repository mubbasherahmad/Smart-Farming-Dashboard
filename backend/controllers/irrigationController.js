const IrrigationSchedule = require('../models/IrrigationSchedule');
const { validationResult } = require('express-validator');

// @desc    Create a new irrigation schedule
// @route   POST /api/irrigation/schedules
// @access  Private
const createIrrigationSchedule = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { zone, startTime, duration } = req.body;

  try {
    const schedule = await IrrigationSchedule.create({
      zone,
      startTime,
      duration,
      createdBy: req.user.id
    });

    res.status(201).json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createIrrigationSchedule
};