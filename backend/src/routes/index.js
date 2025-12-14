const express = require('express');
const router = express.Router();

const sweetRoutes = require('./sweetRoutes');
const authRoutes = require('./authRoutes');

router.use('/sweets', sweetRoutes);
router.use('/auth', authRoutes);

module.exports = router;
