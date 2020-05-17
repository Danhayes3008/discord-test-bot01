const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
const PREFIX = "!";

//variables
var version = '1.0.1';
var author = 'Daniel Hayes';

bot.on("ready", () => {
  console.log("This bot is online!");
});

bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(channel => channel.name === "welcome");
  if (!channel) return;
  channel.send(`Welcome to our server, ${member}, please read the rules and check out !help to see the bot commands`)
});

bot.on("message", (msg) => {
  let args = msg.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    // Ping command
    case "ping":
      msg.reply("pong!");
      break;

    //Website command
    case "website":
      msg.channel.send("youtube.com/aleshgames");
      break;

    // Info commands
    case "info":
      if (args[1] === "version") {
        msg.channel.send(version);
      } else {
        msg.channel.send("invalid request");
      }
      break;

    // Gets the list of commands
    case "help":
      const embed = new Discord.MessageEmbed()
        .addField('**Here are the available commands:**', "cssPlease note that this bot uses '!' as a command prefix")
        .addField("General:", "`!ping`**: Simple direct message that gets one responce back**" +
          "\n`!website`: **Shows a youtube video that was supplied with the tutorial**")
        .addField("Tools:", "`!clear (max 100 messages)`**: Clear up the messages**")
        .addField("__*Version*__", version, true)
        .addField("__*Author*__", author, true)
        .setColor(0x38F560)
        msg.channel.send(embed);
      break;

    // clear messages command
    case "clear":
      if (!args[1]) return msg.reply("Error please define a second arg");
      msg.channel.bulkDelete(args[1]);
      break;
  }
});

// Runs the bot
bot.login(process.env.BOT_TOKEN);
