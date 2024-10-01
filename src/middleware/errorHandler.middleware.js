/**
 * Handles errors by sending a JSON response with the error status and message.
 *
 * @param {Object} error - The error object containing status and message.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @param {Function} next - The next middleware function.
 * @return {void}
 */
const errorHandler = (error, request, response, next) => {
	const status = error.status || 500;
	const message = error.message || "Internal Server Error";

	response.status(status).json({
		status,
		message,
	});
}

export default errorHandler;