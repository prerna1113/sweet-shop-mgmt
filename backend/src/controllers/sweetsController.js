const Sweet = require('../models/Sweet');

const createSweet = async (req, res) => { ... };
const getSweets = async (req, res) => { ... };
const searchSweets = async (req, res) => { ... };
const purchaseSweet = async (req, res) => { ... };
const restockSweet = async (req, res) => { ... };

module.exports = {
  createSweet,
  getSweets,
  searchSweets,
  purchaseSweet,
  restockSweet
};
