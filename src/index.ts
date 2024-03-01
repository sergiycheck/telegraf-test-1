import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import dotenv from "dotenv";
dotenv.config();
import express from "express";

const botToken = process.env.BOT_TOKEN;
if (!botToken) {
  throw new Error("BOT_TOKEN must be provided!");
}
const port = process.env.PORT || 3000;
const webhookDomain = process.env.WEBHOOK_DOMAIN;

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();
app.use(await bot.createWebhook({ domain: webhookDomain }));

bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.launch();

app.listen(port, () => console.log("Listening on port", port));

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
