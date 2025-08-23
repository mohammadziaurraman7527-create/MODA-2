const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Express server for uptime
app.get("/", (req, res) => {
  res.send("✅ Moda bot is running!");
});
app.listen(PORT, () => {
  console.log(`✅ Express server running on port ${PORT}`);
});

// --- Discord Bot Setup ---
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent // Needed for filtering messages
  ]
});

// 👿 Words to filter (you can expand this)
const badWords = ["badword1", "badword2", "stupid", "idiot"];

client.once("ready", () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return; // ignore bots

  const content = message.content.toLowerCase();

  for (let word of badWords) {
    if (content.includes(word)) {
      message.delete().catch(() => {});
      message.channel.send(
        `${message.author}, 🚫 your message contained a banned word and was removed.`
      );
      break;
    }
  }
});

// Login the bot
client.login(process.env.TOKEN);

