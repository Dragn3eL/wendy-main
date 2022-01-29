const Discord = require("discord.js");
const OWNER_ID = require("../../config.json").OWNER_ID;
const ERROR_LOGS_CHANNEL = require("../../config.json").ERROR_LOGS_CHANNEL;
require("dotenv");

module.exports = {
  name: "botservers",
  description: "Check what Servers the bot is in!",
  botPerms: ["USE_EXTERNAL_EMOJIS"],
  aliases:["g"],
  run: async (client, message, args) => {
    try {
      if (message.author.id != OWNER_ID)
        return ;
     let data = []
      let guilds = client.guilds.cache.map((x) => `🔹**${x.name}** | \`${x.memberCount}\` members (ID: ${x.id})\n`);
 let embed = new Discord.MessageEmbed()
  .setDescription(`\`\`\`fix\nTotal Guilds = ${client.guilds.cache.size}\`\`\`\n  ${guilds}`)
  .setColor('#29cddc')
  message.channel.send({embeds:[embed]})
      if (data.length > 0) {
        data.sort();
        data = `🔹 ` + data.join("\n🔹");
      } else {
        data = "[No server found]";
      }
    } catch (err) {
      const errorlogs = client.channels.cache.get(ERROR_LOGS_CHANNEL);

      message.channel.send(
        `Whoops, We got a error right now! This error has been reported to Support center!`
      );

      errorlogs.send(`Error on bs commands!\n\nError:\n\n ${err}`);
    }
  },
};
