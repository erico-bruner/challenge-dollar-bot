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
  await page.goto(process.env.DOLLAR_QUOTE_SITE_URL);
  const dollarValue = await page.$eval('.YMlKec.fxKbKc', (element) => element.textContent);
  const textContent = await page.$eval('.P2Luy.ZYVHBb', (element) => element.textContent);
  const [profitabilityToday] = textContent.split(" ");
  await browser.close();

  return {
    type: "USD/BRL",
    quota: dollarValue,
    profitability_today: profitabilityToday,
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

export const botService = {
  readDollarQuota
};