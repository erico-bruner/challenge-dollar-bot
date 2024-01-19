import { getDollarQuotaInRealWithApi } from "@/controllers";
import { Router } from "express";

const dollarRouter = Router();

dollarRouter.get("/", getDollarQuotaInRealWithApi);

export { dollarRouter };
