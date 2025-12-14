require('dotenv').config();
const connectDB = require('../config/db');
const mongoose = require('mongoose');

beforeAll(async () => {
  await connectDB(process.env.MONGO_URI);
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});
