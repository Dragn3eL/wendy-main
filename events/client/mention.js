const prefixModel = require("../../database/guildData/prefix");
//const config = require("../../../config.json");
const {  MessageEmbed, MessageActionRow, MessageSelectMenu,MessageButton } = require("discord.js");
const { DEFAULT_PREFIX, OWNER_ID ,SUPPORT,INVITE_LINK} = require("../../config");

module.exports = async (message, client) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES"))
    return;

  const { DEFAULT_PREFIX } = require("../../config.json")

  const prefixData = await prefixModel.findOne({
      GuildID: message.guild.id,
    }).catch(err=>console.log(err))
  
    if (prefixData) {
      var PREFIX = prefixData.Prefix
    } else if (!prefixData) {
      PREFIX = DEFAULT_PREFIX
    }
    client.prefix = PREFIX;

  // mentioned bot
  if (message.content ===`<@!${client.user.id}>` || message.content === `<@${client.user.id}>`) {
    const   embed = new MessageEmbed()
    .setAuthor(client.user.tag, client.user.displayAvatarURL(),`https://imgur.com/HkuXplt`
  )
    .setDescription(`My prefix in this guild is \`${PREFIX}\`\n\nTo get a list of commands, type \`${PREFIX}help\``)
   .setColor("#29cddc")
    .setFooter(`love from Dragneel`,`https://imgur.com/dFWaXgM`
    );
    const supportBtn = new MessageButton()
    .setLabel("Support")
    .setStyle("LINK")
    .setURL(`https://discord.gg/6yRpW7e3dS`);

  const inviteBtn = new MessageButton()
    .setLabel("Invite")
    .setStyle("LINK")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=724135554966355968&permissions=2453007697&scope=bot`);

  const buttonsRow = new MessageActionRow().addComponents([supportBtn, inviteBtn]);

   return message.channel.send({embeds:[embed],components:[buttonsRow]} );
  }
};
