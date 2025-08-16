const { body } = require('express-validator');

const irrigationScheduleValidator = [
  body('zone').isIn(['zone1', 'zone2', 'zone3', 'zone4']).withMessage('Invalid zone'),
  body('startTime').not().isEmpty().withMessage('Start time is required'),
  body('duration').isInt({ min: 1, max: 120 }).withMessage('Duration must be between 1-120 minutes')
];

module.exports = {
  irrigationScheduleValidator
};