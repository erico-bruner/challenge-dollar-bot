import { ResponseApiParams } from "@/protocols";
import { format, subDays } from "date-fns";
import axios from "axios";

async function readDollarQuota() {
  const startTime = new Date();
  const date = format(subDays(new Date(), 1), "MM-dd-yyyy");
  const url = process.env.DOLLAR_QUOTE_API_SECOND+`?@dataCotacao='${date}'&$top=100&$format=json`
  const {data: dollar} = await axios.get<ResponseApiParams>(url);
  const endTime = new Date();
  const elapsedTimeInMilliseconds = endTime.getTime() - startTime.getTime();
  const elapsedTime = (elapsedTimeInMilliseconds / 1000).toFixed(2) + " s";

  return {
    ...dollar, 
    time: elapsedTime,
  };
}

export const dollarServiceSecond = {
  readDollarQuota
};