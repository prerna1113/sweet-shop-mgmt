const express = require('express');
const router = express.Router();
const Sweet = require('../models/Sweet');

// POST /api/sweets → add a sweet
router.post('/', async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;

    // basic validation
    if (!name || !category || price == null) {
      return res.status(400).json({
        message: 'Name, category and price are required'
      });
    }

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity
    });

    res.status(201).json(sweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// GET /api/sweets → list all sweets
router.get('/', async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.status(200).json(sweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// GET /api/sweets → list all sweets
// GET /api/sweets/search
router.get('/search', async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(filter);
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/sweets/:id/purchase
router.post('/:id/purchase', async (req, res) => {
  try {
    const { quantity } = req.body;
    const purchaseQty = quantity ? Number(quantity) : 1;

    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    if (sweet.quantity < purchaseQty) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    sweet.quantity -= purchaseQty;
    await sweet.save();

    res.status(200).json(sweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// POST /api/sweets/:id/restock
router.post('/:id/restock', async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity || Number(quantity) <= 0) {
      return res.status(400).json({ message: 'Valid quantity required' });
    }

    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    sweet.quantity += Number(quantity);
    await sweet.save();

    res.status(200).json(sweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});






module.exports = router;
