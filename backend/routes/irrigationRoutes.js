const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { irrigationScheduleValidator } = require('../middleware/irrigationValidator');
const { createIrrigationSchedule,getIrrigationSchedules,updateIrrigationSchedule,deleteIrrigationSchedule } = require('../controllers/irrigationController');


const router = express.Router();

// Create new irrigation schedule
router.post('/schedules', protect, irrigationScheduleValidator, createIrrigationSchedule);
router.get("/schedules", protect, getIrrigationSchedules);
router.put("/schedules/:id", protect, irrigationScheduleValidator, updateIrrigationSchedule);
router.delete("/schedules/:id", protect, deleteIrrigationSchedule);
module.exports = router;