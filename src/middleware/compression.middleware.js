import compression from "compression";

const shouldCompress = (request, response) => {
  if (request.headers["x-no-compression"]) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(request, response);
};

export default compression({ filter: shouldCompress });
