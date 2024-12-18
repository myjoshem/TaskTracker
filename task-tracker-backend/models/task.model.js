const mongoose = require('mongoose');

// Task Schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  dueDate: { type: Date },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

module.exports = mongoose.model('Task', taskSchema);
