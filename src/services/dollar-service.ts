import { ResponseApiParams } from "@/protocols";
import axios from "axios";

async function readDollarQuota() {
  const {data: dollar} = await axios.get<ResponseApiParams>(process.env.DOLLAR_QUOTE_API);
  
  return dollar;
}

export const dollarService = {
  readDollarQuota
};