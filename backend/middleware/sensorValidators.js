const { body } = require('express-validator');

const sensorReadingValidator = [
  body('sensorId').not().isEmpty().withMessage('Sensor ID is required'),
  body('type').isIn(['temperature', 'humidity', 'soil_moisture', 'light']).withMessage('Invalid sensor type'),
  body('value').isNumeric().withMessage('Value must be a number'),
  body('location').optional().isString()
];

module.exports = {
  sensorReadingValidator
};
//hello