import User from '#models/user/user.model.js';
import { generateToken } from '#shared/token.service.js';
import HttpError from 'http-errors';

const register = async (email, password, role) => {
	if (!email || !password) {
		throw new HttpError.BadRequest('Email and password are required');
	}

	const userExist = await User.findOne({ email }, {}, {});

	if (userExist) {
		throw new HttpError.Conflict('User already exists');
	}

	const user = new User({ email, password, role });

	const token = generateToken({
		userId: user.id,
		role: user.role,
	});

	await user.save();

	return {
		status: 201,
		message: 'User registered successfully',
		user: {
			id: user.id,
			email: user.email,
			role: user.role,
		},
		token,
	};
};

const login = async (email, password) => {
	if (!email || !password) {
		throw new HttpError.BadRequest('Email and password are required');
	}

	const user = await User.findOne({ email }, {}, {});

	if (!user) {
		throw new HttpError.NotFound('User not found');
	}

	if (!(await user.comparePassword(password))) {
		throw new HttpError.Unauthorized('Invalid password');
	}

	const token = generateToken({ userId: user.id, role: user.role });

	return {
		status: 200,
		message: 'User logged in successfully',
		user: {
			id: user.id,
			email: user.email,
			role: user.role,
		},
		token,
	};
};

const service = {
	register,
	login,
};

export default service;
