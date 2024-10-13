import User from '#models/user/user.model.js';
import tokenService from '#shared/token.service.js';
import HttpError from 'http-errors';

const createUser = async (email, password, role) => {
	if (!email || !password) {
		throw new HttpError.BadRequest('Email and password are required');
	}

	const userExist = await User.findOne({ email }, {}, {});

	if (userExist) {
		throw new HttpError.Conflict('User already exists');
	}

	const user = new User({ email, password, role });

	const token = tokenService.generateToken({ userId: user.id, role: user.role });

	await user.save();

	return {
		status: 201,
		message: 'User created successfully',
		user: {
			id: user.id,
			email: user.email,
			role: user.role,
		},
		token,
	};
};

const getUserById = async (userId) => {
	const validId = User.isValidObjectId(userId);

	if (!validId) {
		throw new HttpError.BadRequest('Invalid user ID');
	}

	const user = await User.findById(userId);

	if (!user) {
		throw new HttpError.NotFound('User not found');
	}

	return user;
};

const getAllUsers = async () => {
	const users = await User.find({}, {}, {});

	return users;
};

const updateUser = async (userId, email, password, role) => {
	const validId = User.isValidObjectId(userId);

	if (!validId) {
		throw new HttpError.BadRequest('Invalid user ID');
	}

	let user = await User.findByIdAndUpdate(userId, { email, password, role });

	if (!user) {
		throw new HttpError.NotFound('User not found');
	}

	return {
		status: 200,
		message: 'User updated successfully',
		user,
	};
};

const deleteUser = async (userId) => {
	const validId = User.isValidObjectId(userId);

	if (!validId) {
		throw new HttpError.BadRequest('Invalid user ID');
	}

	const user = await User.findByIdAndDelete(userId);

	if (!user) {
		throw new HttpError.NotFound('User not found');
	}

	return {
		status: 200,
		message: 'User deleted successfully',
		user,
	};
};

const service = {
	createUser,
	getUserById,
	getAllUsers,
	updateUser,
	deleteUser,
};

export default service;
