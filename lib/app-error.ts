class AppError extends Error {
  statusCode: number;
  status: string;
  isOpertaional: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = `{statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOpertaional = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
