const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

let token;

beforeAll(async () => {
  // register user to get token
  const res = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Sweet Tester',
      email: 'sweettester@example.com',
      password: 'Password123'
    });

  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Sweet API', () => {
  it('should create a sweet', async () => {
    const res = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Jalebi',
        category: 'Indian',
        price: 15,
        quantity: 30
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Jalebi');
  });

  it('should get all sweets', async () => {
    const res = await request(app).get('/api/sweets');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
