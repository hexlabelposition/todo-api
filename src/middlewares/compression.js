import compression from 'compression';

/* This middleware will never compress responses that include a Cache-Control header with the no-transform directive, 
as compressing will transform the body. */

const shouldCompress = (request, response) => {
	const headers = request;

	if (headers['x-no-compression']) {
		// don't compress responses with this request header
		return false;
	}

	// fallback to standard filter function
	return compression.filter(request, response);
};

export default compression({
	level: 6,
	threshold: 0,
	filter: shouldCompress,
});
