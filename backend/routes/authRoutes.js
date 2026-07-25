const express = require('express');
const router = express.Router();
const { 
  registerAdmin, 
  loginAdmin, 
  getMe, 
  updateProfile,
  logoutAdmin 
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

module.exports = router;
