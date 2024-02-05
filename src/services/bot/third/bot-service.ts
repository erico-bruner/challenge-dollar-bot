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
  await page.goto(process.env.DOLLAR_QUOTE_SITE_URL_THIRD);
  const dollarValue = await page.$eval('.style__Input-sc-zzw8vh-0', (element) => element.ariaValueText);
  await browser.close();

  return {
    type: "USD/BRL",
    quota: dollarValue,
    site: process.env.DOLLAR_QUOTE_SITE_URL_THIRD,
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

export const botServiceThird = {
  readDollarQuota
};