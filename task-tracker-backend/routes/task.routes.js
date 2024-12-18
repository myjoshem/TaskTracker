const express = require('express');
const router = express.Router();
const Task = require('../models/task.model');
const { ObjectId } = require('mongodb');

// GET all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET a single task by ID
router.get('/tasks/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Validate ID format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    // Find task by ID
    const task = await Task.findById(new ObjectId(id));
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (err) {
    console.error('Error fetching task:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST a new task
router.post('/tasks', async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    // Create a new task
    const newTask = new Task({
      title,
      description,
      status,
      dueDate,
    });

    // Save the task to the database
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error('Error creating task:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT (update) a task by ID
router.put('/tasks/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Validate ID format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const { title, description, status, dueDate } = req.body;

    // Update task in the database
    const updatedTask = await Task.findByIdAndUpdate(
      new ObjectId(id), // Convert to ObjectId
      { title, description, status, dueDate },
      { new: true } // Return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    console.error('Error updating task:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE a task by ID
router.delete('/tasks/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Validate ID format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    // Delete the task
    const deletedTask = await Task.findByIdAndDelete(new ObjectId(id));
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting task:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Export router
module.exports = router;
