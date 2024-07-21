const bcrypt = require('bcrypt');
const User = require('../Models/User');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const userSignup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    
    const token = jwt.sign({ userId: user._id, role: user.role, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '120d' });
    
    res.status(200).json({ message: 'User logged in', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { userSignup, userLogin };
