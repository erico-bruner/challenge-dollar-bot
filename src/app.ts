import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import "express-async-errors";
import { handleApplicationErrors } from "./middlewares";
import { botRouter, dollarRouter } from "./routes";

dotenv.config()

const app = express();

app
  .use(cors())
  .use(json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/bot", botRouter)
  .use("/dollar", dollarRouter)
  .use(handleApplicationErrors)

export default app;