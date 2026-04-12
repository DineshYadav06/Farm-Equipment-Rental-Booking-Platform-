import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { appendUserToSheet } from '../services/googleSheetService.js';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password, role, phone } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || 'farmer',
    phone,
  });

  if (user) {
    const token = generateToken(res, user._id);
    
    // Sync to Google Sheets asynchronously without blocking response
    appendUserToSheet({ name, email, phone, role }).catch(err => console.error("Sheet sync failed:", err.message));

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

export { authUser, registerUser };
