// controllers/taskController.js
import Task from '../models/taskModel.js';

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  const task = new Task({
    name: req.body.name,
    description: req.body.description,
    completed: req.body.completed,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        completed: req.body.completed,
        name: req.body.name,
        updatedAt: new Date()
      },
      { new: true }
    );

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted', task });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
