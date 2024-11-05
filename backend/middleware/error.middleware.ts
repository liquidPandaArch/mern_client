import type {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";

const notFoundHandler = (
  // Handle 404 Not Found errors
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error: Error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // If we didn't set the status code, set it to 500 (Internal Server Error), otherwise use the status code from the response.
  const statusCode: number = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFoundHandler, errorHandler };
