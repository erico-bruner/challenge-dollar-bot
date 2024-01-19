import { dollarService } from "@/services";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getDollarQuotaInRealWithApi(req: Request, res: Response) {
  const dollar = await dollarService.readDollarQuota();

  return res.status(httpStatus.OK).send(dollar);
}