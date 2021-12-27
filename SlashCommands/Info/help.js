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
      .setPlaceholder('Help Menu- Click on me')
      .setMinValues(1)
      .setMaxValues(1)
      .addOptions([
        {
          label: "Settings",
          description: "Change the bot  server  settings",
          value: "settings",
          emoji: "🧩"
        },
        
       
        
        {
          label: "Information",
          description: "Gets you the information commands",
          value: "info",
          emoji: "<:info:919584891631448115>"
        },
        
        {
          label: "Music",
          description: "All music comamnds :)!",
          value: "music",
          emoji: "<a:music:763415718271385610>"
        },
       {
          label: "Utility",
          description: "Some of my utility commands",
          value: "utility",
          emoji: "⛑️"
        },
       
      ])
    )

    let helpEmbed = new MessageEmbed()

    .setTitle(`${client.user.username }'s Help aka  mY Command Menu`)
    .setDescription(`Heyyo,me - I am miss Wendy, Wendy marvell from Fairy tail yes!.\nBut now am  here in discord as a Discord Music Bot`)
    .addField(`__Features__`,
    `>>> An advance discord bot with a descent music play system spotify <:spotify:919582094391398430> and Soundcloud <:souncloud:919756799303888956> support
                                 Filters and more things in upcoming updates`)
     .addField(`:question: __Using me__`,
    `>>> Ezzy pizzy ,just join a voice channel where i have proper perms and type \`w!play <song_name>\`\n or u can use the prefix set for the server instead of w!`)                            
    .addField( `<:info:919584891631448115> INFO`,
    `>>> Prefix: ${DEFAULT_PREFIX} \nTotal Commands: ${client.commands.size}  \nServers: ${client.guilds.cache.size} \n Uptime :${duration}`,true
  )                             
    .setColor("#29cddc")
    .setImage(`https://cdn.discordapp.com/attachments/735293660064776275/798941062148128818/wendy_song.gif`)

    
    

    interaction.reply({ embeds: [helpEmbed], components: [helpMenu]}).then(msg=>{
      setTimeout(async function () {
        await msg.delete();
      }, 180000)
    })
    }
  }
};
