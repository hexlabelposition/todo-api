import service from '#services/auth.service.js';

const register = async (request, response, next) => {
	try {
		const { email, password, role } = request.body;
		const data = await service.register(email, password, role);
		return response.status(201).json(data);
	} catch (error) {
		next(error);
	}
};

const login = async (request, response, next) => {
	try {
		const { email, password } = request.body;
		const data = await service.login(email, password);
		return response.status(200).json(data);
	} catch (error) {
		next(error);
	}
};

const controller = {
	register,
	login,
}

export default controller;
