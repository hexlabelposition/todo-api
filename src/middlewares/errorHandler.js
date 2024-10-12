const errorHandler = (error, request, response) => {
	const status = error.status || 500;
	const message = error.message || 'Internal Server Error';

	response.status(status).json({
		status,
		message,
	});
};

export default errorHandler;
