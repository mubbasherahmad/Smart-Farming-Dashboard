const request = require('supertest');
const app = require('../server');
const IrrigationSchedule = require('../models/IrrigationSchedule');
const User = require('../models/User');

describe('Irrigation API', () => {
  let token;

  beforeAll(async () => {
    // Clear databases
    await IrrigationSchedule.deleteMany({});
    await User.deleteMany({});

    // Register a test user
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Irrigation Test User',
        email: 'irrigationuser@example.com',
        password: 'password123'
      });

    // Login to get token
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'irrigationuser@example.com',
        password: 'password123'
      });
    
    token = loginRes.body.token;
  });

  describe('POST /api/irrigation/schedules', () => {
    test('Create irrigation schedule with valid data', async () => {
      const res = await request(app)
        .post('/api/irrigation/schedules')
        .set('Authorization', `Bearer ${token}`)
        .send({
          zone: 'zone1',
          startTime: '2023-06-15T08:00:00',
          duration: 30
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('zone', 'zone1');
      expect(res.body).toHaveProperty('duration', 30);
      expect(res.body).toHaveProperty('createdBy');
    });

    test('Prevent unauthenticated access', async () => {
      const res = await request(app)
        .post('/api/irrigation/schedules')
        .send({
          zone: 'zone2',
          startTime: '2023-06-15T10:00:00',
          duration: 15
        });
      
      expect(res.statusCode).toBe(401);
    });

    test('Fail with invalid zone', async () => {
      const res = await request(app)
        .post('/api/irrigation/schedules')
        .set('Authorization', `Bearer ${token}`)
        .send({
          zone: 'invalid_zone', // Invalid zone
          startTime: '2023-06-15T10:00:00',
          duration: 15
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('errors');
    });

    test('Fail with missing start time', async () => {
      const res = await request(app)
        .post('/api/irrigation/schedules')
        .set('Authorization', `Bearer ${token}`)
        .send({
          zone: 'zone3',
          duration: 20
          // Missing startTime
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('errors');
    });

    test('Fail with invalid duration (too short)', async () => {
      const res = await request(app)
        .post('/api/irrigation/schedules')
        .set('Authorization', `Bearer ${token}`)
        .send({
          zone: 'zone4',
          startTime: '2023-06-15T12:00:00',
          duration: 0 // Invalid duration
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('errors');
    });

    test('Fail with invalid duration (too long)', async () => {
      const res = await request(app)
        .post('/api/irrigation/schedules')
        .set('Authorization', `Bearer ${token}`)
        .send({
          zone: 'zone1',
          startTime: '2023-06-15T14:00:00',
          duration: 121 // Invalid duration (max is 120)
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('errors');
    });
  });
});