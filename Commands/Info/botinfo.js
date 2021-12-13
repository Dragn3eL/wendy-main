/**
* READ THIS BEFORE YOU CHANGE THE CONTENT OF THIS COMMAND!
* You are not allowed to change lines about this repo in this command.
* You can change bot name and owner name, but not the source of this bot.
* You are also not allowed to remove the credits from the footer to the orginal owner from this bot.
* If you want to change the description, you will have to add the line that: "[YOUR BOT NAME] is an modified instance of Reaper-2.0 bot made by Simpleboy353.
* These points are not optional, but remarks from the dev team of Reaper-2.0.
*/

const Discord = require("discord.js");
const moment = require("moment");
const { DEFAULT_PREFIX } = require("../../config.json")
require("moment-duration-format");
module.exports = {
  name: "botinfo",
  aliases: "[wendy]",
  usage: "botinfo | wendy",
  description: "Shows the bot info",

  botPerms: ["EMBED_LINKS"],
  run: async (client, message, args) => {
    
    const duration = moment
      .duration(client.uptime)
      .format(" D [days], H [hrs], m [mins], s [secs]");

    let embed = new Discord.MessageEmbed()
      .setAuthor("Wendy's Info", client.user.avatarURL())
      .setColor("#29cddc")
      .setDescription(
        `Konichiwa | hello | namaste am <@724135554966355968>, a discord music bot in beta  ,am pretty descent with support of Youtube <a:ayoutube:919582561783668776> and spotify <:spotify:919582094391398430> and Soundcloud <:souncloud:919756799303888956> :), looking forward to grow with everyone cause i am short xD  \n
     
        `)
      .addField(`<:developer:919584435186331658> Developer`,`\`\`\`yml\nDragneel#1255\`\`\``,true)  
     
        
       .addField( `<:info:919584891631448115> INFO`,`\`\`\`yml\nPrefix: ${DEFAULT_PREFIX} \nTotal Commands: ${client.commands.size} \nUsers: ${
          client.users.cache.size
        } \nServers: ${client.guilds.cache.size} \nChannels: ${
          client.channels.cache.size
        }\`\`\``,true
      )
     
      .setFooter("For any queries or help join our support server \`w!support\` :)",client.user.displayAvatarURL());
    message.channel.send({ embeds: [embed] });
  },
};
