const Discord = module.require("discord.js");
const OWNER_ID = require("../../config.json").OWNER_ID;


module.exports = {
  name: "userid",
  botPerms: ["EMBED_LINKS"],
  run: async (client, message, args) => {

    if (!OWNER_ID) return 


    var mention = message.guild.member(message.mentions.users.first());
    if (!mention) return message.channel.send("Mention a user to get their ID");
    const lolicon = mention.user.avatarURL;
    const lolid = new Discord.MessageEmbed()
      .setThumbnail(mention.user.avatarURL)
      .setColor("RANDOM")
      .setTitle("Here is " + `${mention.user.username}\'s ID`)
      .setDescription(`${mention.id}`)
      .setThumbnail(lolicon);
    message.channel.send({ embeds: [lolid] });
  },
};
