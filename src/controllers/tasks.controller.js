import service from '#services/tasks.service.js';

const createTask = async (request, response, next) => {
	try {
		const { title, description } = request.body;
		const data = await service.createTask(title, description);
		return response.status(201).json(data);
	} catch (error) {
		next(error);
	}
};

const getTaskById = async (request, response, next) => {
	try {
		const { taskId } = request.params;
		const data = await service.getTaskById(taskId);
		return response.status(200).json(data);
	} catch (error) {
		next(error);
	}
};

const getAllTasks = async (request, response, next) => {
	try {
		const data = await service.getAllTasks();
		return response.status(200).json(data);
	} catch (error) {
		next(error);
	}
};

const updateTask = async (request, response, next) => {
	try {
		const { taskId } = request.params;
		const { title, description } = request.body;
		const data = await service.updateTask(taskId, title, description);
		return response.status(200).json(data);
	} catch (error) {
		next(error);
	}
};

const deleteTask = async (request, response, next) => {
	try {
		const { taskId } = request.params;
		const data = await service.deleteTask(taskId);
		return response.status(200).json(data);
	} catch (error) {
		next(error);
	}
};

const controller = {
	createTask,
	getTaskById,
	getAllTasks,
	deleteTask,
	updateTask,
};

export default controller;
