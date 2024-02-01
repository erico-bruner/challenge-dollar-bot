import { getDollarQuotaInRealWithPuppeteerOne, getDollarQuotaInRealWithPuppeteerSecond } from "@/controllers/bot-controller";
import { Router } from "express";

const botRouter = Router();

botRouter.get("/dollar-quota-1", getDollarQuotaInRealWithPuppeteerOne);
botRouter.get("/dollar-quota-2", getDollarQuotaInRealWithPuppeteerSecond);

export { botRouter };
