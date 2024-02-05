import axios from "axios";
import puppeteer, { Protocol } from "puppeteer";

async function getDollarQuotaInRealWithPuppeteer() {
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
  await page.setRequestInterception(true);

  page.on('request', (request) => {
    if (
      //request.resourceType() == 'stylesheet' ||
      request.resourceType() == 'font' ||
      request.resourceType() == 'image'
    ) {
      request.abort();
    } else {
      if (request.url().includes('login')) {
        console.log("==============================");
        console.log('URL: ', request.url());
        console.log('BODY: ', request.postData());
        console.log("==============================");
      }
      request.continue();
    }
  });

  await page.goto(process.env.DOLLAR_QUOTE_SITE_URL_LINKEDIN);
  await page.locator("#username").fill("ericodasilvabruner@gmail.com");
  const passElement = await page.$('#password');
  await passElement.type(process.env.PASS);
  await passElement.press("Enter")

  /*const formData = {
    loginCsrfParam: 'ef4dfe0c-d50c-4e12-8b05-0f12b584babd',
    session_key: 'ericodasilvabruner@gmail.com',
    session_password: 'Erico24/03',
  };*/

  //const {data} = await axios.post("https://www.linkedin.com/uas/login-submit", formData);
  //"ajax:2802721021118254900"
  //32212804445591500613966933523838047542	
/*

const url = "https://www.linkedin.com/checkpoint/lg/login-submit";

const formDatas = new URLSearchParams();
formDatas.append('csrfToken', 'ajax%3A6147678199900478567');
formDatas.append('session_key', 'ericodasilvabruner%40gmail.com');
formDatas.append('ac', '0');
formDatas.append('pkSupported', 'true');
formDatas.append('sIdString', '9be0e264-1bd7-4b93-8dc4-587b2e531868');
formDatas.append('parentPageKey', 'd_checkpoint_lg_consumerLogin');
formDatas.append('pageInstance', 'urn:li:page:checkpoint_lg_login_default;wbSlVqwVThWxz8GNPkT5TQ==');
formDatas.append('trk', '');
formDatas.append('authUUID', '');
formDatas.append('session_redirect', '');
formDatas.append('loginCsrfParam', '6d1106e2-1b3e-4fad-8276-d18f2f1fb621');
formDatas.append('fp_data', 'default');
formDatas.append('apfc', '{"df":{"a":"MfBt2HwFjLwKb4Bbl7+ijQ==","b":"CLbFNlaQ29BlKpX3V5XstzufK8S0zKKxBCMJF/Vf7E8AEzN5wD3ZdzE9e7D0STHwn9OLWoGALTlsSQ+I8Bz3y+3/X8C50tGcY3uFp3spHVDujXgG9Ln+/t3T+BSiO1HYGdHHkhQvF56/8h99LCqDZgfxCU/reN5+5ttanp+y6ke3xjAsz5YEYZYE7BPnVw1pOzcycAsqXOR7FFt7nTZy3O6oxCMB+lpBHNWSSwUay43minOVtoXxAjZk79vxwpUmReWhSuPxyuivzEgSUI9RQu+PCj1eVmyZPkNpkzmGqJrwc2lzQNj0uWSvE7isj+x/KDobs88gV5pi1MsXxffihw==","c":"HPYNY4KJ7B4BKvLETpVO/nK9rQGBDwPUmMz9ZvuSmytYuzX+NbFDSP4bitu8WG0eNTw9CjLet7fShyGEoV1ZTwyS8kFFwU1+S4kCkGTF9KipDuJ5X7RHapK2MSHiEfBWVlJSRTCLH2cOiUnKQ5g1n0KF65ysT7x53rPBoDgAtilvnuVjxBW7MeYOrS+JqVdWIizSPJbdx8Za72urXDNNglGP39y66GzH+FCJdJdAoj0k3HedWAa1nwLQXzQFi6zcc41ndol0IOAon4ZQgqGCG295U2vPhDSpmvZof4YsVWAbbB691c5EPQEeGnj/uK05UXEL+zCfGm7b8+D6Wq7KeV78Ofxasg05+yBtHmnnT97/rtCvaRbpjieFEcgoTPE52lSTii1pxKjkMa/aoOn/XrqVqMqhd/rs8SB2V8FqBubxSTVREsbcFMmFcZ5qVSHUzUnavTJfu+W97p2izYjkVwggCN3YwztUPMXhhuVJQXvHGz9F+Y2z4a7XnOVKs6ZNvDBKF5bnqID8OH0NLmNW8dBZjED9H92l3z+1OD0n/FGF+UwaQ3IgY/DA6DSKcKSBrZ5T7yj3BXzudjKCEHM3hZLUQyDBstCYiUa3USKU7wh3X5bG6sC0xEvRJr0JO9Jlg7fP3A=="}');
formDatas.append('browser-info', 'bhSs6pov07Zw2YJSLSYaEag2Cp8LSfFwRCAp9zE5J2gzpHWKSxxNMVu0+UqIMr0RSVyxip2ytQunBt/ZOVs2To7JN9gEw9FnB9B0tzSdC1GA7hjzgW8EzVLdF7CpxiFlM2p1P14iLdDwVmYTOAxvEr7QJiRUciHv5uQX7RVqJ83BNU6dwA3wTQkpJJu0fj11K+1ivDPjPZb8uA2mZblK8WELswDZpI3OGb8tHdGp7RB11FvAoMFT5cNOxZgDoaPP36zJQlWTBR/F8Ez36vN+K8iSf1Esu5qIA==');

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: formDatas
})
  .then(response => response.text())
  .then(async data => {
    console.log(data)
    const p = await browser.newPage()
    p.setContent(data);
  })
  .catch(error => console.error('Error:', error));
*/

}

async function loginAndSendMessage() {
  const startTime = new Date();
  const dollar = await getDollarQuotaInRealWithPuppeteer();
  const endTime = new Date();
  const elapsedTimeInMilliseconds = endTime.getTime() - startTime.getTime();
  const elapsedTime = (elapsedTimeInMilliseconds / 1000).toFixed(2) + " s";

  return {
    time: elapsedTime,
    create_date: new Date(),
  };

}

export const botServiceLinkedin = {
  loginAndSendMessage
};