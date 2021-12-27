const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { DEFAULT_PREFIX, OWNER_ID } = require('../../config')
module.exports = {
    name: "server",
    description: "View the  server dashboard for the required category.",
    botPerms: ["MANAGE_GUILD"],
    userPerms: ["ADMINISITRATOR"],
    run: async(client, message, args)=>{
        if (!args[0]){
            return message.channel.send(`\n  For admin settings  \`w!server admin\``);
        }
        if (args[0] === "admin") {
            const adminMenu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomId("adminMenu")
                .setPlaceholder("Admin Menu")
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions([
                    {
                        label: "DJ",
                        description: "DJ settings!",
                        value: "dj",
                    },
                    
                    
                    {
                        label: "Prefix",
                        description: "Change the bot's prefix for your server!",
                        value: "prefix"
                    }
                ])
            )
            let dashembed = new MessageEmbed().setColor('#29cddc').setDescription(`Management settings below\n select an option from the dropdown.Thanks!`).setTimestamp().setFooter(message.guild.name,client.user.displayAvatarURL())

            return message.channel.send({embeds:[{description: `Admin settings for ${message.guild.name}`,color:('#29cddc').setTimestamp()}], components: [adminMenu]})

        } else {
            return message.channel.send("That option doesn't seem to exist!")
        }
    }
}