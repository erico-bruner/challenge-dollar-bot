import { botService } from "@/services/bot-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getDollarQuotaInRealWithPuppeteer(req: Request, res: Response) {
  const dollar = await botService.readDollarQuota();

  return res.status(httpStatus.OK).send(dollar);
}