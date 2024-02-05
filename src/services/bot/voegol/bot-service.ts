import axios from "axios";
import puppeteer from "puppeteer";

async function loginVoegol() {
  const startTime = new Date();

  const url = 'https://b2c.voegol.com.br/minhas-viagens/login';
  const user = process.env.USER_VOEGOL;
  const pass = process.env.PASS_VOEGOL;

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
      request.resourceType() == 'image' ||
      request.resourceType() == 'media' 
    ) {
      request.abort();
    } else {
      request.continue();
    }
  });

  await page.goto(url);
  //#select-input-method > div > ul > li:nth-child(1) > button
  const method = (await page.$('#select-input-method > div > ul > li:nth-child(1) > button')).click()
  //await page.type('#login', user);

  //const passSelector = await page.$('#password');
  //await passSelector.type(pass);
  //await passSelector.press('Enter');
  const endTime = new Date();
  const elapsedTimeInMilliseconds = endTime.getTime() - startTime.getTime();
  const elapsedTime = (elapsedTimeInMilliseconds / 1000).toFixed(2) + " s";

  return {
    time_to_login: elapsedTime
  };
}

async function login() {
  const info = await loginVoegol();

  return {
    data: info
  };

}

export const botServiceLinkedin = {
  login
};