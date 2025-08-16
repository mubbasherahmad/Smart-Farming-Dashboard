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
const getIrrigationSchedules = async (req, res) => {
  try {
    const schedules = await IrrigationSchedule.find({ createdBy: req.user.id })
      .sort({ startTime: 1 }); // Sort by start time ascending
    res.json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
const updateIrrigationSchedule = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { zone, startTime, duration } = req.body;

    const updated = await IrrigationSchedule.findByIdAndUpdate(
      id,
      { zone, startTime, duration },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
const deleteIrrigationSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await IrrigationSchedule.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    
    res.json({ message: "Schedule deleted successfully", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createIrrigationSchedule,
  getIrrigationSchedules,
  updateIrrigationSchedule,
  deleteIrrigationSchedule
};