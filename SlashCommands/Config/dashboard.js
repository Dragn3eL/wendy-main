const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: "dashboard",
    description: "View the dashboard for the required category.",
    options: [
        {
            name: "admin",
            description: "Shows the admin menu",
            type: 'SUB_COMMAND',
        },
        
    ],
    run: async(client, interaction, args)=>{
        
        if (interaction.options.getSubcommand() === "admin") {
            if (!client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id).permissions.has("ADMINISTRATOR")) {
                return interaction.reply("Missing Permissions")
            }
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
                        description: "setup dj role for use in server!",
                        value: "dj",
                    },
                   
                   
                    {
                        label: "Prefix",
                        description: "Change the bot's prefix for your server!",
                        value: "prefix"
                    }
                ])
            )

            return interaction.reply({ content: "Select an option from below\n", components: [adminMenu]})

        } 
    }
}