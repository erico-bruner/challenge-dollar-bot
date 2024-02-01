import { dollarServiceOne } from "@/services/api/one/dollar-service";
import { dollarServiceSecond } from "@/services/api/second/dollar-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getDollarQuotaInRealWithApiOne(req: Request, res: Response) {
  const dollar = await dollarServiceOne.readDollarQuota();

  return res.status(httpStatus.OK).send(dollar);
}

export async function getDollarQuotaInRealWithApiSecond(req: Request, res: Response) {
  const dollar = await dollarServiceSecond.readDollarQuota();

  return res.status(httpStatus.OK).send(dollar);
}