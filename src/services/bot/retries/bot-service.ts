import puppeteer from "puppeteer";

async function getDollarQuotaInRealWithPuppeteer(retries: number = 1) {
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

  const results = [] as any;
  let errors = 0;

  for (let attempt = 1; attempt <= retries; attempt++) {
    const startTime = new Date();
    let dollarValue = null;
    let profitabilityToday = null;

    try {
      const page = await browser.newPage();
      await page.goto(process.env.DOLLAR_QUOTE_SITE_URL_ONE);
      dollarValue = await page.$eval('.YMlKec.fxKbKc', (element) => element.textContent);
      const textContent = await page.$eval('.P2Luy.ZYVHBb', (element) => element.textContent);
      const [profitability] = textContent.split(" ");
      profitabilityToday = profitability;
    } catch (error) {
      dollarValue = `Erro na tentativa ${attempt}!`;
      errors += 1;
    } finally {
      const endTime = new Date();
      const elapsedTimeInMilliseconds = endTime.getTime() - startTime.getTime();
      const elapsedTime = (elapsedTimeInMilliseconds / 1000).toFixed(2) + " s";

      results.push({
        type: "USD/BRL",
        quota: dollarValue,
        profitability_today: profitabilityToday,
        time: elapsedTime,
      });
    }
  }

  return {
    attempts: retries,
    errors: errors,
    site: process.env.DOLLAR_QUOTE_SITE_URL_ONE,
    results: results,
  };
}

async function readDollarQuota(retries: number = 1) {
  const dollar = await getDollarQuotaInRealWithPuppeteer(retries);

  return dollar;
}

export const botServiceRetries = {
  readDollarQuota
};