import { botServiceOne } from "@/services/bot/one/bot-service";
import { botServiceSecond } from "@/services/bot/second/bot-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getDollarQuotaInRealWithPuppeteerOne(req: Request, res: Response) {
  const dollar = await botServiceOne.readDollarQuota();

  return res.status(httpStatus.OK).send(dollar);
}

export async function getDollarQuotaInRealWithPuppeteerSecond(req: Request, res: Response) {
  const dollar = await botServiceSecond.readDollarQuota();

  return res.status(httpStatus.OK).send(dollar);
}