const Lead = require('../models/Lead');

// @desc    Create new lead
// @route   POST /api/leads
// @access  Public
const createLead = async (req, res) => {
  try {
    const { name, email, budget, message, phone, requirements } = req.body;
    
    // Basic validation
    if (!name || !email || !budget || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const lead = await Lead.create({
      name,
      email,
      budget,
      message,
      phone,
      requirements
    });

    res.status(201).json(lead);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update lead
// @route   PATCH /api/leads/:id
// @access  Private
const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const updateFields = {};
    if (status !== undefined) {
      if (!['New', 'Contacted', 'Closed'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
      updateFields.status = status;
    }
    
    if (notes !== undefined) {
      updateFields.notes = notes;
    }

    const lead = await Lead.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private
const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findByIdAndDelete(id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.status(200).json({ message: 'Lead deleted successfully', id });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createLead,
  getLeads,
  updateLead,
  deleteLead
};
