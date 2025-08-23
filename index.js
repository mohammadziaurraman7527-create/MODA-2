// Moda - Discord Censor Bot

const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");

// Keep Render alive
const app = express();
app.get("/", (req, res) => res.send("✅ Moda Censor Bot is running!"));
app.listen(5000, () => console.log("🌐 Express server running on port 5000"));

// Create Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// List of banned words
const bannedWords = ["badword1", "badword2", "stupid", "idiot"]; // customize these

// On bot ready
client.once("ready", () => {
  console.log(`🤖 Moda Censor Bot is online as ${client.user.tag}`);
});

// On message
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();

  // Check if message contains banned word
  if (bannedWords.some(word => content.includes(word))) {
    try {
      await message.delete();
      await message.channel.send(
        `⚠️ ${message.author}, your message contained inappropriate language and was removed by Moda.`
      );
      console.log(`❌ Deleted a censored message from ${message.author.tag}`);
    } catch (err) {
      console.error("❌ Failed to delete message:", err);
    }
  }
});

// Login
client.login(process.env.TOKEN);
