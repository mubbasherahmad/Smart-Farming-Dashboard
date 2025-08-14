const request = require('supertest');
const app = require('../server');
const SensorReading = require('../models/SensorReading');
const User = require('../models/User');

describe('Sensor API', () => {
  let token;

  beforeAll(async () => {
    // Clear databases
    await SensorReading.deleteMany({});
    await User.deleteMany({});

    // Register a test user
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Sensor Test User',
        email: 'sensoruser@example.com',
        password: 'password123'
      });

    // Login to get token
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'sensoruser@example.com',
        password: 'password123'
      });
    
    token = loginRes.body.token;
  });

  test('Create sensor reading with valid token', async () => {
    const res = await request(app)
      .post('/api/sensors')
      .set('Authorization', `Bearer ${token}`)
      .send({
        sensorId: 'sensor-001',
        type: 'temperature',
        value: 25.5,
        location: 'Field A'
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('sensorId', 'sensor-001');
  });

  test('Prevent unauthenticated access', async () => {
    const res = await request(app)
      .post('/api/sensors')
      .send({
        sensorId: 'sensor-002',
        type: 'humidity',
        value: 60
      });
    
    expect(res.statusCode).toBe(401);
  });

  test('Fail with invalid sensor data', async () => {
    const res = await request(app)
      .post('/api/sensors')
      .set('Authorization', `Bearer ${token}`)
      .send({
        sensorId: '', // Invalid - empty
        type: 'invalid_type', // Invalid type
        value: 'not_a_number' // Invalid value
      });
    
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('errors');
  });
});