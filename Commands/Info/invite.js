const Discord = require("discord.js");
const {MessageActionRow, MessageButton} = require ('discord.js')

module.exports = {
  name: "invite",
  description: "Get the bot's",
  botPerms: ["EMBED_LINKS"],
  aliases:[`support`],
  usage:"w!<invite/support>\n <> optional",
  run: async (client, message, args) => {


    const row = new MessageActionRow().addComponents(
       new MessageButton()
       //.setCustomId("ok")
       .setLabel("Invite me")
       .setStyle("LINK")
       .setURL(`https://discord.com/api/oauth2/authorize?client_id=724135554966355968&permissions=2453007697&scope=bot`)
       .setEmoji(`🤖`),
      
      new MessageButton()
      .setLabel("Support Server")
      .setStyle("LINK")
      .setURL(`https://discord.gg/6yRpW7e3dS`)
      .setEmoji('🏠'),
      new MessageButton()
      .setLabel("vote")
      .setStyle("LINK")
      .setURL("https://top.gg/bot/724135554966355968/vote")
      .setEmoji('🌐')
     // .setDisabled()

    )
    let embed = new Discord.MessageEmbed()
      .setAuthor("Wendy 	٩(◕‿◕｡)۶ ",client.user.displayAvatarURL())
      .setColor("#29cddc")
      .setThumbnail(`https://cdn.discordapp.com/attachments/852915269784305715/906035502006812742/ezgif.com-gif-maker.gif`)
      //.setImage()
      .setDescription(
        "**My Invite Link [Here click me](https://discord.com/api/oauth2/authorize?client_id=724135554966355968&permissions=2453007697&scope=bot)**\n**Make sure to join our [Support Server| Home](https://discord.gg/6yRpW7e3dS)  🏡 **"
      )
      .setFooter(`Requested By: ${message.author.username} | Wendy <3 U`,message.author.displayAvatarURL());
    message.channel.send({ embeds: [embed],components:[row] });
  },
};
