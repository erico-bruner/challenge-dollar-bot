import { botServiceLinkedin } from "@/services/bot/linkedin/bot-service-estudar";
import { botServiceOne } from "@/services/bot/one/bot-service";
import { botServiceRetries } from "@/services/bot/retries/bot-service";
import { botServiceSecond } from "@/services/bot/second/bot-service";
import { botServiceThird } from "@/services/bot/third/bot-service";
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

export async function getDollarQuotaInRealWithPuppeteerRetries(req: Request, res: Response) {
  const retries = parseInt(req.query.qty as string);
  const dollar = await botServiceRetries.readDollarQuota(retries);

  return res.status(httpStatus.OK).send(dollar);
}

export async function getDollarQuotaInRealWithPuppeteerThird(req: Request, res: Response) {
  const dollar = await botServiceThird.readDollarQuota();

  return res.status(httpStatus.OK).send(dollar);
}

export async function loginAndSendMessageToLinkedin(req: Request, res: Response) {
  const info = await botServiceLinkedin.loginAndSendMessage();

  return res.status(httpStatus.OK).send(info);
}

export async function voegolProcesses(req: Request, res: Response) {
  const info = await botServiceLinkedin.loginAndSendMessage();

  return res.status(httpStatus.OK).send(info);
}