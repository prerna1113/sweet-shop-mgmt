const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(201).json({ token });

  } catch (error) {
    // IMPORTANT: log real error
    console.error('REGISTER ERROR >>>', error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser };
