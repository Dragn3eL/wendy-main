const Discord = require('discord.js')

module.exports = async(interaction, client) => {
    if (!interaction.isSelectMenu()) return;

    if (interaction.customId === "help_menu") {

        let msg = await interaction.channel.messages.fetch(interaction.message.id)

        if (interaction.values[0] === "settings") {
            await interaction.deferUpdate()

            const settingsEmbed = new Discord.MessageEmbed()
        .setTitle("Config Commands")
        .setDescription(
          " use w!dashboard <admin> for all admin setup cmds"
        )
        .setColor("RANDOM");

      await msg.edit({ embeds: [settingsEmbed] });

        }   else if (interaction.values[0] === "music") {
 
         await interaction.deferUpdate();
 
         const musicEmbed = new Discord.MessageEmbed()
         .setTitle(`Music Commands`)
         .setDescription("`clearqueue`, `filter`, `filter list`, `info`, `jump`, `loop`, `lyrics`, `move`, `mute`, `pause`, `play`, `previoustrack`, `queue`, `remove`, `resume`, `unmute`, `volume`, `youtube`\n\n```Note: Music commands work only with slash commands!\nBe sure to use music before each command!```")
         .setColor("#29cddc")
 
         await msg.edit({ embeds: [musicEmbed] })

        } else if (interaction.values[0] === "info") {

            await interaction.deferUpdate()

            const infoEmbed = new Discord.MessageEmbed()
        .setTitle("Info Commands")
        .setDescription(
          "`botinfo`, `devteam`, `emojiid`, `help`, `invite`, `ping`, `policy`, `report`, `userinfo`, `userid`, `serverinfo`, `suggest`"
        )
        .setColor("#9bff00");

        await msg.edit({ embeds: [infoEmbed] })

        }  else if (interaction.values[0] === "utility") {
            await interaction.deferUpdate()

            const utilityEmbed = new Discord.MessageEmbed()
        .setTitle("Utility Commands")
        .setDescription(
          "`avatar`, `animesearch`, `announce`, `calculator`, `clear`, `createrole`, `delchannel`, `delrole`, `enlargemoji`, `esay`, `giverole`, `google`, `imdb`, `lock`, `newtext`, `newvoice`, `nickname`, `poll`, `removerole`, `say`, `servericon`, `serverinfo`, `suggestion`, `translate`, `unlock`, `weather`, `wiki`, `youtube`"
        )
        .setColor("#eec9b0");

        await msg.edit({ embeds: [utilityEmbed] })

      } 
    }
}
