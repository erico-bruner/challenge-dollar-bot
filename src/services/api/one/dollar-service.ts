import { ResponseApiParams } from "@/protocols";
import axios from "axios";

async function readDollarQuota() {
  const startTime = new Date();
  const {data: dollar} = await axios.get<ResponseApiParams>(process.env.DOLLAR_QUOTE_API_ONE);
  const endTime = new Date();
  const elapsedTimeInMilliseconds = endTime.getTime() - startTime.getTime();
  const elapsedTime = (elapsedTimeInMilliseconds / 1000).toFixed(2) + " s";

  return {
    ...dollar, 
    time: elapsedTime,
  };
}

export const dollarServiceOne = {
  readDollarQuota
};