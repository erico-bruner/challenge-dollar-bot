import { getDollarQuotaInRealWithPuppeteerOne, getDollarQuotaInRealWithPuppeteerRetries, getDollarQuotaInRealWithPuppeteerSecond, getDollarQuotaInRealWithPuppeteerThird, loginAndSendMessageToLinkedin } from "@/controllers/bot-controller";
import { Router } from "express";

const botRouter = Router();

botRouter.get("/dollar-quota-1", getDollarQuotaInRealWithPuppeteerOne);
botRouter.get("/dollar-quota-2", getDollarQuotaInRealWithPuppeteerSecond);
botRouter.get("/dollar-quota-3", getDollarQuotaInRealWithPuppeteerThird);
botRouter.get("/dollar-quota-retries", getDollarQuotaInRealWithPuppeteerRetries);
botRouter.get("/linkedin", loginAndSendMessageToLinkedin);
botRouter.get("/voegol", loginAndSendMessageToLinkedin);

export { botRouter };
