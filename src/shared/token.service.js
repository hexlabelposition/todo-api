import jwt from 'jsonwebtoken';
import config from '#config/config.js';
import HttpError from 'http-errors';

const generateToken = (payload) => {
	const token = jwt.sign(payload, config.jwtSecret, {
		expiresIn: '1h',
	});

	return token;
};

const decodeToken = (token) => {
	try {
		return jwt.verify(token, config.jwtSecret);
	} catch (error) {
		throw new HttpError.Unauthorized('Invalid Token');
	}
};

const tokenService = {
	generateToken,
	decodeToken,
};

export default tokenService;
