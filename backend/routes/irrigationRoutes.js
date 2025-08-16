const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { irrigationScheduleValidator } = require('../middleware/irrigationValidator');
const { createIrrigationSchedule,getIrrigationSchedules,updateIrrigationSchedule } = require('../controllers/irrigationController');


const router = express.Router();

// Create new irrigation schedule
router.post('/schedules', protect, irrigationScheduleValidator, createIrrigationSchedule);
router.get("/schedules", protect, getIrrigationSchedules)
router.put("/schedules/:id", protect, irrigationScheduleValidator, updateIrrigationSchedule);;

module.exports = router;