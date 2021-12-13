const { MessageEmbed, MessageActionRow, MessageSelectMenu} = require("discord.js");

module.exports = {
  name: "help",
  description: "Get the Command List",
  aliases: ["commands", "cmd", "h"],
  botPerms: ["EMBED_LINKS"],
  run: async (client, message, args) => {


    if (args[0]) {
      let command = args[0];
      let cmd = client.commands.get(command);

      if (!cmd) {
        return message.channel.send("Couldn't find that command!")
      } else if (cmd) {
        let description = cmd.description ? cmd.description : "No description available.";
        let aliases = cmd.aliases ? cmd.aliases.join(", ") : "No aliases available.";
      //  let botPerms = cmd.botPerms ? cmd.botPerms.join(", ") : "No permissions required.";
      //  let userPerms = cmd.userPerms ? cmd.userPerms.join(", ") : "No permissions required.";
      //  let ownerOnly = cmd.ownerOnly ? "Yes" : "No";
      let usage = cmd.usage ? cmd.usage: "No usage for the cmd"
        let nsfwOnly = cmd.nsfwOnly ? "Yes" : "No";
        let cooldown = cmd.cooldown ? cmd.cooldown : "No cooldown.";
      //  let isDisabled = cmd.isDisabled ? "Yes" : "No";

        let helpEmbed = new MessageEmbed()
        .setThumbnail(`${client.user.displayAvatarURL()}`)
        .setTitle(`__Help for__ :**__${cmd.name}__**`)
        .addField("Name", `${cmd.name}`, true)
        .addField("Description", `${description}`)
        .addField("Aliases", `${aliases}`,true)
        .addField("Usage",`${cmd.usage}`)
    //    .addField("Owner Only", `${ownerOnly}`, true)
    //    .addField("NSFW Only", `${nsfwOnly}`, true)
        .addField("Cooldown", `${cooldown}`, true)
    //    .addField("Disabled", `${isDisabled}`, true)
    //    .addField("Required Bot Permissions", `${botPerms}`, true)
    //    .addField("Required User Permissions", `${userPerms}`, true)
        .setColor("#29cddc")
        .setTimestamp()

        return message.channel.send({ embeds: [helpEmbed] })
      }

    } else if (!args[0]) {

    let helpMenu = new MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
      .setCustomId("help_menu")
      .setPlaceholder(`${client.user.username }'s Help aka Command Menu`)
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

    let editEmbed = new MessageEmbed()
    .setTitle(`${client.user.username }'s Help aka Command Menu`)
    .setDescription('Choose a Help option from the menu below!')
    .setColor("#29cddc")
    .setImage(`https://cdn.discordapp.com/attachments/735293660064776275/798941062148128818/wendy_song.gif`)

      message.channel.send({ embeds: [editEmbed], components: [helpMenu]}).then(msg=>{
        setTimeout(async function () {
          await msg.delete();
        }, 180000)
      })
    }
  }
};
