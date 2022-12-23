const express = require("express");
const axios = require("axios");
const { Telegraf } = require("telegraf");

require("dotenv").config();

const app = express();

app.use(express.json());

const bot = new Telegraf(process.env.BOT_TOKEN);

const WEBHOOK_URL = "https://dbaf-192-144-124-11.sa.ngrok.io";
const TELEGRAM_API = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

const setWebhook = async () => {
  try {
    const response = await axios.post(
      `${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

bot.start((ctx) => ctx.reply("Welcome!"));

bot.command('joke', async (ctx) => {
  try {
    const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
    const { setup, punchline } = response.data;
    const message = `${setup}\n${punchline}`;
    ctx.reply(message);
  } catch (error) {
    console.log(error);
  }
})

bot.command("cat", async (ctx) => {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/images/search");
    const { url } = response.data[0];
    ctx.replyWithPhoto(url);
  } catch (error) {
    console.log(error);
  }
});

bot.command("galinha", async (ctx) => {
  try {
    const response = await axios.get("https://chickencoop.xyz/api/chicken");
    const chicken = response.data;
    ctx.replyWithPhoto(chicken.image);
  } catch (error) {
    console.log(error);
  }
});

bot.command("cachorro", async (ctx) => {
  try {
    const response = await axios.get("https://dog.ceo/api/breeds/image/random");
    const dog = response.data;
    ctx.replyWithAnimation(dog.message);
  } catch (error) {
    console.log(error);
  }
});

bot.launch();

app.listen(3000, async () => {
  console.log("Server running on port 3000");
  await setWebhook();
});