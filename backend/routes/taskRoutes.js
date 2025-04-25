// routes/taskRoutes.js
import express from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';

const router = express.Router();

// Routes for tasks
router.get('/tasks', getTasks); // Get all tasks
router.post('/tasks', createTask); // Create a new task
router.put('/tasks/:id', updateTask); // Update a task
router.delete('/tasks/:id', deleteTask); // Delete a task

export default router;
