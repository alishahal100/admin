const bcrypt = require('bcrypt');
const User = require('../Models/User');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const userSignup = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email }).lean();
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password with 10 salt rounds (consider using bcryptjs for async)
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userName, email, password: hashedPassword, role });

    // Save the new user
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup Error: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email }).lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role, username: user.userName },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '120d' }
    );

    // Send token and success message
    res.status(200).json({ message: 'User logged in', token });
  } catch (error) {
    console.error('Login Error: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { userSignup, userLogin };
