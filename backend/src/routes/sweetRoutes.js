const express = require("express");
const router = express.Router();
const Sweet = require("../models/Sweet");
const { protect } = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

/*
  ADMIN: Add a sweet
*/
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;

    if (!name || !category || price == null) {
      return res
        .status(400)
        .json({ message: "Name, category and price are required" });
    }

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity,
    });

    res.status(201).json(sweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/*
  PUBLIC: Get all sweets
*/
router.get("/", async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.status(200).json(sweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
  PUBLIC: Search sweets
*/
router.get("/search", async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" };
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

/*
  USER: Purchase sweet
*/
router.post("/:id/purchase", protect, async (req, res) => {
  try {
    const purchaseQty = Number(req.body.quantity || 1);

    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    if (sweet.quantity < purchaseQty) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    sweet.quantity -= purchaseQty;
    await sweet.save();

    res.json(sweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
  ADMIN: Restock sweet
*/
router.post("/:id/restock", protect, adminOnly, async (req, res) => {
  try {
    const qty = Number(req.body.quantity);

    if (!qty || qty <= 0) {
      return res.status(400).json({ message: "Valid quantity required" });
    }

    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    sweet.quantity += qty;
    await sweet.save();

    res.json(sweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
  ADMIN: Update sweet (price / quantity / name)
*/
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.json(sweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
  ADMIN: Delete sweet
*/
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.json({ message: "Sweet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
