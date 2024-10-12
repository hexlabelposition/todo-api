import Task from '#models/task/task.model.js';

const createTask = async (title, description ) => {
	const task = new Task({ title, description });
	await task.save();

	return {
		status: 201,
		message: 'Task created successfully',
		task
	}
};

const getTaskById = async (taskId) => {
	const task = await Task.findById(taskId);

	return task;
};

const getAllTasks = async () => {
	const tasks = await Task.find();

	return tasks;
};

const updateTask = async (taskId, title, description) => {
	await Task.findByIdAndUpdate(taskId, { title, description });

	return {
		status: 200,
		message: 'Task updated successfully',
	}
};

const deleteTask = async (taskId) => {
	await Task.findByIdAndDelete(taskId);

	return {
		status: 200,
		message: 'Task deleted successfully',
	}
};

const service = {
	createTask,
	getTaskById,
	getAllTasks,
	deleteTask,
	updateTask,
};

export default service;
