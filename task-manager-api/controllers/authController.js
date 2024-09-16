const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
     const { username, email, password } = req.body;
     try {
          const newUser = new User({ username, email, password });
          await newUser.save();
          res.status(201).json({ message: 'User registered successfully' });
     } catch (err) {
          res.status(500).json({ error: err.message });
     }
};

const login = async (req, res) => {
     const { email, password } = req.body;
     try {
          const user = await User.findOne({ email });
          if (!user) return res.status(400).json({ message: 'Invalid credentials' });

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

          const token = jwt.sign({ userId: user._id, roles: user.roles }, process.env.JWT_SECRET, {
               expiresIn: '1h'
          });
          res.status(200).json({ token });
     } catch (err) {
          res.status(500).json({ error: err.message });
     }
};

module.exports = { register, login };
