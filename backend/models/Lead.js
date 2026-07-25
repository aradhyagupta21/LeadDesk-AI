const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  budget: {
    type: String,
    required: [true, 'Budget is required'],
    enum: ['<$500', '$500-$2,000', '$2,000-$5,000', '$5,000+']
  },
  phone: {
    type: String,
    default: ''
  },
  requirements: [{
    type: String,
    enum: ['AI Chatbots', 'Workflow Automation', 'Web Development', 'Data Analytics']
  }],
  message: {
    type: String,
    required: [true, 'Message is required'],
    minlength: [15, 'Message must be at least 15 characters long']
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Closed'],
    default: 'New'
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Lead', leadSchema);
