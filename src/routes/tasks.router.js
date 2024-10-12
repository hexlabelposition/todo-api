import { Router } from 'express';
import controller from '#controllers/tasks.controller.js';

const router = Router();

// Create a new task
router.post('/', controller.createTask);
// Get a task by ID
router.get('/:taskId', controller.getTaskById);
// Get all tasks
router.get('/', controller.getAllTasks);
// Update a task
router.patch('/:taskId', controller.updateTask);
// Delete a task
router.delete('/:taskId', controller.deleteTask);

export default router;
