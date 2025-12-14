const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('Auth API', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should register a user and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'testauth@example.com',
        password: 'Password123'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });
});
