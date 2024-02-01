import { ResponseApiParams } from "@/protocols";
import axios from "axios";

async function readDollarQuota(retries = 3) {
  const results = [] as any;
  let errors = 0;

  for (let attempt = 1; attempt <= retries; attempt++) {
    const startTime = new Date();
    let dollar = null;

    try {
      const url = process.env.DOLLAR_QUOTE_API_ONE;
      const {data}= await axios.get<ResponseApiParams>(url);
      dollar = data;
    } catch (error) {
      dollar = `Erro na tentativa ${attempt}:`;
      errors += 1;
    } finally {
      const endTime = new Date();
      const elapsedTimeInMilliseconds = endTime.getTime() - startTime.getTime();
      const elapsedTime = (elapsedTimeInMilliseconds / 1000).toFixed(2) + " s";

      results.push({
        data: dollar,
        time: elapsedTime,
      });
    }
  }

  return {
    attempts: retries,
    errors: errors,
    results: results,
  };
}

export const dollarServiceRetries = {
  readDollarQuota
};