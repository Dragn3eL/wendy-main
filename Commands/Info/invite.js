const Discord = require("discord.js");

module.exports = {
  name: "invite",
  description: "Get the bot's",
  botPerms: ["EMBED_LINKS"],
  run: async (client, message, args) => {
    let embed = new Discord.MessageEmbed()
      .setTitle("Wendy 	٩(◕‿◕｡)۶ ")
      .setColor("#29cddc")
      .setThumbnail(message.author.displayAvatarURL())
      .setImage(`https://cdn.discordapp.com/attachments/852915269784305715/906035502006812742/ezgif.com-gif-maker.gif`)
      .setDescription(
        "**My Invite Link [Here click me](https://discord.com/api/oauth2/authorize?client_id=724135554966355968&permissions=2453007697&scope=bot)**\n**Make sure to join our [Support Server| Home](https://discord.gg/6yRpW7e3dS)  🏡 **"
      )
      .setFooter(`Requested By: ${message.author.username} | Wendy <3 U`);
    message.channel.send({ embeds: [embed] });
  },
};
