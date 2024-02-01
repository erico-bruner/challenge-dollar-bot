import { getDollarQuotaInRealWithApiOne, getDollarQuotaInRealWithApiSecond } from "@/controllers";
import { Router } from "express";

const dollarRouter = Router();

dollarRouter.get("/1", getDollarQuotaInRealWithApiOne);
dollarRouter.get("/2", getDollarQuotaInRealWithApiSecond);

export { dollarRouter };
