const { MessageEmbed, MessageActionRow, MessageSelectMenu} = require("discord.js");

module.exports = {
  name: "help",
  description: "Shows the Help Menu",
  options: [
    {
      name: "menu",
      description: "Shows the Help Menu",
      type: 'SUB_COMMAND'
    }
  ],
  run: async (client, interaction, args) => {

    if (interaction.options.getSubcommand() === "menu") {

    let helpMenu = new MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
      .setCustomId("help_menu")
      .setPlaceholder('Help Menu')
      .setMinValues(1)
      .setMaxValues(1)
      .addOptions([
        {
          label: "Settings",
          description: "Change the bot settings",
          value: "settings",
          emoji: "🛠"
        },
        
       
        {
          label: "Information",
          description: "Shows all the information commands",
          value: "info",
          emoji: "📢"
        },
        
        {
          label: "Music",
          description: "Shows all the Music commands!",
          value: "music",
          emoji: "🎵"
        },
        
        {
          label: "Utility",
          description: "Shows all the utility commands",
          value: "utility",
          emoji: "🔧"
        },
       
      ])
    )

    let helpEmbed = new MessageEmbed()
    .setTitle('Help Menu')
    .setDescription('Choose an option from the menu below!')
    .setColor("GREEN")

    interaction.reply({ embeds: [helpEmbed], components: [helpMenu]})
    }
  }
};
