class ApiError extends Error {
  statusCode: number;
  error?: any;
  constructor(statusCode: number, message: string, error?: any) {
    super(message);
    this.error = error;
    this.statusCode = statusCode;
    // this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = "Bad request",error?: any) {
    return new ApiError(400, message, error);
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiError(401, message);
  }
  static conflict(message = "Conflict") {
    return new ApiError(409, message);
  }
  static forbidden(message = "forbidden") {
    return new ApiError(412, message);
  }
  static notFound(message = "Not found") {
    return new ApiError(404, message);
  }
}

export default ApiError;
