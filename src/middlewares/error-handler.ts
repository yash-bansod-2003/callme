import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { ZodError } from "zod";
import Jsonwebtoken from "jsonwebtoken";
import zodErrorAdapter from "@/adapters/error/zod.error.js";
import httpErrorAdapter from "@/adapters/error/http.error.js";
import configuration from "@/config/configuration.js";
export interface ErrorResponse {
  name: string;
  code: number;
  errors: unknown[];
  stack?: string;
}

const errorHandler = (
  err: Error | HttpError | ZodError | Jsonwebtoken.TokenExpiredError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let errorResponse: ErrorResponse = {
    name: "Internal Server Error",
    code: 500,
    errors: [
      {
        message: "Internal Server Error",
        path: "",
      },
    ],
    ...(configuration.node_env !== "production" && { stack: err.stack }),
  };

  if (err instanceof ZodError) {
    errorResponse = zodErrorAdapter(err);
  }

  if (err instanceof HttpError) {
    errorResponse = httpErrorAdapter(err);
  }

  if (err instanceof Jsonwebtoken.TokenExpiredError) {
    errorResponse = {
      name: err.name,
      code: 400,
      errors: [
        {
          message: err.message,
          path: "",
        },
      ],
    };
  }

  if (err instanceof Jsonwebtoken.JsonWebTokenError) {
    errorResponse = {
      name: err.name,
      code: 401,
      errors: [
        {
          message: err.message,
          path: "",
        },
      ],
    };
  }
  res.status(errorResponse.code).json(errorResponse);
};

export default errorHandler;
