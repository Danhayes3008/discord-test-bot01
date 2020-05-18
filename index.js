const Discord = require('discord.js');
const {Client, Attachment, MessageEmbed} = require('discord.js');
const bot = new Client();
const fs = require("fs");
const ms = require("ms");
const PREFIX = "!";

//variables
var version = "1.0.1";
var author = "Daniel Hayes";

bot.on("ready", () => {
  console.log("This bot is online!");
});

bot.on("guildMemberAdd", (member) => {
  const channel = member.guild.channels.find(
    (channel) => channel.name === "welcome"
  );
  if (!channel) return;
  channel.send(
    `Welcome to our server, ${member}, please read the rules and check out !help to see the bot commands`
  );
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
        .addField("Tools:", "`!clear (max 100 messages)`**: Clear up the messages**" +
          "\n`!mute {name} {time}`**: mute a player**" + "\n`!unmute {name}`**: unmute a player")
        .addField("__*Version*__", version, true)
        .addField("__*Author*__", author, true)
        .setColor(0x38f560);
      msg.author.send(embed);
      break;

    // clear messages command
    case "clear":
      if (!args[1]) return msg.reply("Error please define a second arg");
      msg.channel.bulkDelete(args[1]);
      break;

    //this will allow us to mute people
    case "mute":
      //selects the user entered
      let person = msg.guild.member(
        msg.mentions.users.first() || msg.guild.members.get(args[1])
      );
      if (!person) return msg.reply("Could'nt find them!");
      //the roles that will be swiched around
      let mainrole = msg.guild.roles.cache.find((role) => role.name === "temp");
      let muterole = msg.guild.roles.cache.find((role) => role.name === "mute");
      if (!muterole) return msg.reply("Could'nt find the mute role");
      let time = args[2];
      // checks how long
      if (!time) {
        return msg.reply("you didnt say for how long");
      }
      //changes the role to mute
      person.roles.remove(mainrole.id);
      person.roles.add(muterole.id);
      msg.channel.send(
        `@${person.user.tag} has now been muted for ${ms(ms(time))}`
      );
      setTimeout(function () {
        //changes the role to temp
        person.roles.add(mainrole.id);
        person.roles.remove(muterole.id);
        msg.channel.send(`@${person.user.tag} has been unmuted!`)
      }, ms(time));
      break;

    case 'unmute':
      if (!msg.member.roles.cache.find(r => r.name === "admin")) return msg.channel.send("Unortherised command!")
      //selects the user entered
      let mutedPerson = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[1]))
      if (!mutedPerson) return msg.reply("Could'nt find them!");
      if (mutedPerson) {
        person.roles.add(mainrole.id);
        person.roles.remove(muterole.id);
        msg.channel.send(`@${person.user.tag} has been unmuted!`)
      };
      //the roles that will be swiched around
      // let quietrole = msg.guild.roles.cache.find(role => role.name === "mute");
      // let unmuterole = msg.guild.roles.cache.find(role => role.name === "temp");
      // if (quietrole) {
      //   mutedPerson.roles.cache.find(unmuterole.id);
      //   mutedPerson.roles.remove(unmuterole.id);
        // //changes the role to mute
        // if (quietrole) {
        // mutedPerson.roles.remove(quietrole.id);
        // mutedPerson.roles.add(unmuterole.id);
        // msg.channel.send(`@${mutedPerson.user.tag} has now been unmuted `);
      // };
  }
});

// Runs the bot
bot.login(process.env.BOT_TOKEN);
