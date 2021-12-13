const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { DEFAULT_PREFIX, OWNER_ID } = require('../../config')
module.exports = {
    name: "dashboard",
    description: "View the dashboard for the required category.",
    botPerms: ["MANAGE_GUILD"],
    userPerms: ["ADMINISITRATOR"],
    run: async(client, message, args)=>{
        if (!args[0]){
            return message.channel.send(`Please specify an option! Available Options:\`\`\`fix\ndashboard admin\n\`\`\``);
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

            return message.channel.send({ content: "Admin Settings", components: [adminMenu]})

        } else {
            return message.channel.send("That option doesn't seem to exist!")
        }
    }
}