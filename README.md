# Overview

This project is a backend application of a technical challenge. In this application it is possible to use the back-end to consult the dollar quota via webscraping and via api through HTTP(s) requests following the REST convention.

# Demo

https://challenge-dollar-bot.onrender.com

# How it works?

This project is a REST API to serve the application of a dollar quote website.

### Bot

Represents the webscraping bot route.
note: It was not configured to run in deploy, only in development!

<details>
  <summary><code>GET /bot/dollar-quota</code></summary>
  <br/>
  <li>Search for the dollar quota.</li>
  <br/>
</details>

### Dollar

Represents the dollar query route through public api.

<details>
  <summary><code>GET /dollar-quota</code></summary>
  <br/>
  <li>Search for the dollar quota.</li>
  <br/>
</details>
<br/>

# Technologies
For this project, the following were used:

- Node (v 16.17.0);
- Express;
- TypeScript;
- Prisma;
- Postgres;
- Jest and Supertest;
- Joi;

# How to run in development

- Clone this repository
- Install all dependencies

  ```bash
  npm i
  ```

- Configure the `.env` file using the `.env.example`.

- Run the back-end in a development environment:

  ```bash
  npm run dev
  ```