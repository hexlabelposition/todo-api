class CustomError extends Error {
  /**
   * Initializes a new instance of the CustomError class.
   *
   * @param {string} message - The error message.
   * @return {void}
   */
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
