import service from '#services/users.service.js';

const createUser = async (request, response, next) => {
	try {
		const { email, password, role } = request.body;
		const data = await service.createUser(email, password, role);
		return response.status(201).json(data);
	} catch (error) {
		next(error);
	}
};

const getUserById = async (request, response, next) => {
	try {
		const { userId } = request.params;
		const data = await service.getUserById(userId);
		return response.status(200).json(data);
	} catch (error) {
		next(error);
	}
};

const getAllUsers = async (request, response, next) => {
	try {
		const data = await service.getAllUsers();
		return response.status(200).json(data);
	} catch (error) {
		next(error);
	}
};

const updateUser = async (request, response, next) => {
	try {
		const { userId } = request.params;
		const { email, password, role } = request.body;
		const data = await service.updateUser(userId, email, password, role);
		return response.status(200).json(data);
	} catch (error) {
		next(error);
	}
};

const deleteUser = async (request, response, next) => {
	try {
		const { userId } = request.params;
		const data = await service.deleteUser(userId);
		return response.status(200).json(data);
	} catch (error) {
		next(error);
	}
};

const controller = {
	createUser,
	getUserById,
	getAllUsers,
	updateUser,
	deleteUser,
};

export default controller;
