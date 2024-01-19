import { getDollarQuotaInRealWithPuppeteer } from "@/controllers/bot-controller";
import { Router } from "express";

const botRouter = Router();

botRouter.get("/dollar-quota", getDollarQuotaInRealWithPuppeteer);

export { botRouter };
