import puppeteer from "puppeteer";

async function getDollarQuotaInRealWithPuppeteer() {
  const browser = await puppeteer.launch({ 
    headless: "new", 
    args: [
      "--no-sandbox", 
      "--disable-setuid-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath: 
      process.env.NODE_ENV === "production" 
      ? process.env.PUPPETEER_EXECUTABLE_PATH
      : puppeteer.executablePath(), 
  });
  const page = await browser.newPage();
  await page.goto(process.env.DOLLAR_QUOTE_SITE_URL_SECOND);
  const purchase = await page.$eval('#home > div > div:nth-child(1) > div:nth-child(1) > div > cotacao > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > span', (element) => element.textContent);
  const sales = await page.$eval('#home > div > div:nth-child(1) > div.componente.cotacao > div > cotacao > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(3) > span', (element) => element.textContent);
  await browser.close();

  return {
    type: "USD/BRL",
    purchase_quota: purchase,
    sales_quota: sales,
    site: process.env.DOLLAR_QUOTE_SITE_URL_SECOND,
  }
}

async function readDollarQuota() {
  const startTime = new Date();
  const dollar = await getDollarQuotaInRealWithPuppeteer();
  const endTime = new Date();
  const elapsedTimeInMilliseconds = endTime.getTime() - startTime.getTime();
  const elapsedTime = (elapsedTimeInMilliseconds / 1000).toFixed(2) + " s";

  return {
    ...dollar, 
    time: elapsedTime,
    create_date: new Date(),
  };
}

export const botServiceSecond = {
  readDollarQuota
};