const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// List of bad words (expand as needed)
const badWords = [
  "fuck",
  "shit",
  "bitch",
  "asshole",
  "bastard",
  "dick",
  "cunt"
];

client.once("ready", () => {
  console.log(`✅ Moda is online as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return; // ignore bot messages

  const content = message.content.toLowerCase();

  // check for bad words
  const foundBadWord = badWords.find(word => content.includes(word));

  if (foundBadWord) {
    try {
      await message.delete();
      await message.channel.send(
        `🚫 Message from **${message.author.username}** deleted: contained inappropriate word (**${foundBadWord}**)`
      );
    } catch (err) {
      console.error("❌ Error deleting message:", err);
    }
  }
});

client.login(process.env.TOKEN);


