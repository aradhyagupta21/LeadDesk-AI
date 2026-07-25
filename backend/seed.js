const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/leaddesk');
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const seedAdmin = async () => {
  await connectDB();

  try {
    const adminExists = await Admin.findOne({ email: 'admin@leaddesk.com' });
    if (adminExists) {
      console.log('Admin already exists');
      process.exit();
    }

    const admin = await Admin.create({
      name: 'Super Admin',
      email: 'admin@leaddesk.com',
      password: 'admin123'
    });

    console.log('Admin created successfully:', admin.email);
    process.exit();
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

seedAdmin();
