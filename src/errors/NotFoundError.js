import CustomError from "./CustomError.js";

class NotFoundError extends CustomError {
  /**
   * Initializes a new instance of the NotFoundError class.
   *
   * @param {string} message - The error message.
   * @return {void}
   */
  constructor(message) {
    super(message);
    this.name = "	NotFoundError";
    this.status = 404;
  }
}

export default NotFoundError;
