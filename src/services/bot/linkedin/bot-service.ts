import axios from "axios";
import puppeteer from "puppeteer";

async function getDollarQuotaInRealWithPuppeteer() {
  const startTime = new Date();

  //const url = 'https://www.pichau.com.br/account'
  const url = 'https://www.kabum.com.br/login'

  const browser = await puppeteer.launch({ 
    headless: false, 
    args: [
      "--no-sandbox", 
      "--disable-setuid-sandbox",
      "--single-process",
      "--no-zygote",
      "--disable-animations",
    ],
    executablePath: 
      process.env.NODE_ENV === "production" 
      ? process.env.PUPPETEER_EXECUTABLE_PATH
      : puppeteer.executablePath(), 
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
  await page.setRequestInterception(true);

  page.on('request', (request) => {
    if (
      request.resourceType() == 'stylesheet' ||
      request.resourceType() == 'font' ||
      //request.resourceType() == 'image' ||
      request.resourceType() == 'media' 
    ) {
      request.abort();
    } else {
      request.continue();
    }
  });

  await page.goto(url);
  //await page.type('#username', 'ericodasilvabruner@gmail.com');
  await page.type('#login', 'ericodasilvabruner@gmail.com');
  const passSelector = await page.$('#password');
  await passSelector.type('Erico24/03');
  await passSelector.press('Enter');

  await page.waitForNavigation({ waitUntil: 'load' });

  const cookies = await page.cookies();

  await browser.close();
  const endTime = new Date();
  const elapsedTimeInMilliseconds = endTime.getTime() - startTime.getTime();
  const elapsedTime = (elapsedTimeInMilliseconds / 1000).toFixed(2) + " s";

  const newBrowser = await puppeteer.launch({ 
    headless: false, 
    args: [
      "--no-sandbox", 
      "--disable-setuid-sandbox",
      "--single-process",
      "--no-zygote",
      "--disable-animations",
    ],
    executablePath: 
      process.env.NODE_ENV === "production" 
      ? process.env.PUPPETEER_EXECUTABLE_PATH
      : puppeteer.executablePath(), 
  });

  const nPage = await newBrowser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
  await nPage.setCookie(...cookies);
  await nPage.goto(url);

  return {
    time_to_save_login: elapsedTime
  };
}

async function loginAndSendMessage() {
  const dollar = await getDollarQuotaInRealWithPuppeteer();

  return {
    data: dollar
  };

}

export const botServiceLinkedin = {
  loginAndSendMessage
};