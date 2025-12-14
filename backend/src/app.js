const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const routes = require('./routes');
app.use('/api', routes);

// test route
app.get('/', (req, res) => {
  res.json({ message: 'Sweet Shop API is running' });
});

module.exports = app;
