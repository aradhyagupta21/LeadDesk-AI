const express = require('express');
const router = express.Router();
const {
  createLead,
  getLeads,
  updateLead,
  deleteLead
} = require('../controllers/leadController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(createLead)
  .get(protect, getLeads);

router.route('/:id')
  .patch(protect, updateLead)
  .delete(protect, deleteLead);

module.exports = router;
