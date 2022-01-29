const Discord = require('discord.js')

module.exports = async(interaction, client) => {
    if (!interaction.isSelectMenu()) return;

    if (interaction.customId === "help_menu") {

        let msg = await interaction.channel.messages.fetch(interaction.message.id)

        if (interaction.values[0] === "settings") {
            await interaction.deferUpdate()

            const settingsEmbed = new Discord.MessageEmbed()
        .setTitle("Some Config Commands")
        .setDescription(
          " use \`w!server admin\` for all admin setup cmds"
        )
        .setColor("#147bd3")
        .setTimestamp()


      await msg.edit({ embeds: [settingsEmbed] });

        }   else if (interaction.values[0] === "music") {
 
         await interaction.deferUpdate();
 
         const musicEmbed = new Discord.MessageEmbed()
         .setTitle(`My Music Commands`)
         .setDescription("`clearqueue`| `filter`| `filter list`| `loop`| `lyrics`|`jump`| `nowplaying`| `pause`| `play`| `queue`| `remove`| `resume`|  `volume`|`save`| `search`| `seek` | `stop` ")
         .setColor("#29cddc")
         .setFooter(`You can use w!help <command_name> for more info`,client.user.displayAvatarURL())
         .setTimestamp()
 
         await msg.edit({ embeds: [musicEmbed] })

        } else if (interaction.values[0] === "info") {

            await interaction.deferUpdate()

            const infoEmbed = new Discord.MessageEmbed()
        .setTitle("Little Info Commands")
        .setDescription(
          "`botinfo`| `help`| `invite`|`support` | `ping`|  `report`| `userinfo`|  `serverinfo`| `suggest`| `uptime`"
        )
        .setColor("#bb34ff")
        .setFooter(`You can use w!help <command_name> for more info`,client.user.displayAvatarURL())
        .setTimestamp()

        await msg.edit({ embeds: [infoEmbed] })

        }  else if (interaction.values[0] === "utility") {
            await interaction.deferUpdate()

            const utilityEmbed = new Discord.MessageEmbed()
        .setTitle("Utility Commands")
        .setDescription(
          "`avatar`| `animesearch`| `wikipedia`| `enlargemoji` | `poll`|  `serverinfo`| | `youtube`"
        )
        .setColor("#9ace44")
        .setFooter(`You can use w!help <command_name> for more info`,client.user.displayAvatarURL())
        .setTimestamp()

        await msg.edit({ embeds: [utilityEmbed] })

      } 
    }
}
