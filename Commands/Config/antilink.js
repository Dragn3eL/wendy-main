const prefixModel = require("../../database/guildData/antilink");
const { MessageEmbed } = require("discord.js");


module.exports = {
  name: "antilink",
  description: "Setup antilink in server!",
  userPerms: ["MANAGE_GUILD"],
  botPerms: ["MANAGE_CHANNELS"],
  run: async (client, message, args) => {
    if (!args[0]) {
let antiembed = new MessageEmbed()
 .setColor('#29CDDC')
        .setFooter(client.user.username + " | UwU ",client.user.displayAvatarURL())
        .setTitle('How to set antilink')
        .setDescription(`\`\`\`fix\n${message.client.prefix}antilink #channel|off | useful in song channel to avoid link spam\n\`\`\``)
        .setThumbnail('https://media.discordapp.net/attachments/726134541638697042/798506734540161024/tumblr_m0acjiwign1qm9b8do1_r1_500.gif?width=375&height=209')


      return message.channel.send({ embeds: [antiembed] }).then(msg => {
    message.delete()
    setTimeout(() => msg.delete(), 8000)
  })
  .catch()
        
        
        }


      
      
    
    if (message.mentions.channels.first()) {
      const data = await prefixModel.findOne({
        GuildID: message.guild.id,
      });

       if (data) {
        await prefixModel.findOneAndRemove({
          GuildID: message.guild.id,
        });
let antion = new MessageEmbed()
 .setColor('#29CDDC')
        .setFooter(client.user.username + " | UwU ",client.user.displayAvatarURL())
        .setTitle('Setting antilink')
        .setDescription(`\`\`\`fix\nAntilink is now active\n\`\`\``)
        .setThumbnail('https://media.discordapp.net/attachments/726134541638697042/798506734540161024/tumblr_m0acjiwign1qm9b8do1_r1_500.gif?width=375&height=209')


        message.channel.send({ embeds: [antion] }).then(msg => {
    message.delete()
    setTimeout(() => msg.delete(), 8000)
  })
  .catch();

       let newData = new prefixModel({
          AntilinkCH: message.mentions.channels.first().id,
          GuildID: message.guild.id,
        });
        newData.save();
      } else if (!data) {

let antionn = new MessageEmbed()
 .setColor('#29CDDC')
        .setFooter(client.user.username + " | UwU ",client.user.displayAvatarURL())
        .setTitle('How to set antilink')
        .setDescription(`\`\`\`diff\n+Antilink is now active |٩(｡•́‿•̀｡)۶ \n\`\`\``)
        .setThumbnail('https://media.discordapp.net/attachments/726134541638697042/798506734540161024/tumblr_m0acjiwign1qm9b8do1_r1_500.gif?width=375&height=209')





        message.channel.send({ embeds: [antionn] }).then(msg => {
    message.delete()
    setTimeout(() => msg.delete(), 8000)
  })
  .catch();

        let newData = new prefixModel({
          AntilinkCH: message.mentions.channels.first().id,
          GuildID: message.guild.id,
        });
        newData.save();
      }
    } else if (args[0] === "off" || args[0] === "Off") {
      const data2 = await prefixModel.findOne({
        GuildID: message.guild.id,
      });

      if (data2) {
        await prefixModel.findOneAndRemove({
          GuildID: message.guild.id,
        });
let antiof = new MessageEmbed()
 .setColor('#29CDDC')
        .setFooter(client.user.username + " | UwU ",client.user.displayAvatarURL())
        .setTitle('How to set antilink')
        .setDescription(`\`\`\`diff\n-Antilink is now Disabled| (ノωヽ)\n\`\`\``)
        .setThumbnail('https://media.discordapp.net/attachments/726134541638697042/798506734540161024/tumblr_m0acjiwign1qm9b8do1_r1_500.gif?width=375&height=209')



        return message.channel.send({ embeds: [antiof] }).then(msg => {
    message.delete()
    setTimeout(() => msg.delete(), 8000)
  })
  .catch();
      } else if (!data2) {
        let notset = new MessageEmbed()
         .setColor('#29cddc')
         .setDescription(`\`\`\`fix\n=Antilink is not Setup yet|(〇_ｏ)\n\`\`\``)
        return message.channel.send({ embeds: [notset] }).then(msg => {
    message.delete()
    setTimeout(() => msg.delete(), 8000)
  })
  .catch();
      }
    }
  },
};
