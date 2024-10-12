import jwt from 'jsonwebtoken';
import config from '#config/config.js';
import HttpError from 'http-errors';

export const generateToken = (payload) => {
	const token = jwt.sign(
		payload,
		config.jwtSecret,
		{
		expiresIn: '1h',
	});

	return token;
}

export const decodeToken = (token) => {
	try {
		return jwt.verify(token, config.jwtSecret);
	} catch (error) {
		throw new HttpError.Unauthorized('Invalid Token');
	}
};