import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import config from '#config/config.js';

const authentication = (roles = []) => {
	return (request, response, next) => {
		try {
			const token = request.headers.authorization?.split(' ')[1];

			if (!token) {
				new createHttpError.Forbidden('Token is missing.');
			}

			const decoded = decodeToken(token);
			request.user = decoded;

			if (roles.length && !roles.includes(decoded.role)) {
				new createHttpError.Forbidden('Invalid role. Access denied.');
			}

			next();
		} catch (error) {
			next(error);
		}
	};
};

const decodeToken = (token) => {
	try {
		return jwt.verify(token, config.jwtSecret);
	} catch (error) {
		throw new createHttpError.Unauthorized('Invalid Token');
	}
};

export default authentication;

