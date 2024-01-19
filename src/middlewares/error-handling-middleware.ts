import { ApplicationError, RequestError } from "@/protocols";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export function handleApplicationErrors(
  err: RequestError | ApplicationError | Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {

  console.log(err);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
}