const express = require('express');
const router = express.Router();

const sweetRoutes = require('./sweetRoutes');

router.use('/sweets', sweetRoutes);

module.exports = router;
