const { MessageEmbed, MessageActionRow, MessageSelectMenu,MessageButton} = require("discord.js");
const { DEFAULT_PREFIX } = require("../../config.json")
const moment = require("moment");

module.exports = {
  name: "help",
  description: "Get the Command List",
  aliases: ["commands", "h"],
  botPerms: ["EMBED_LINKS"],
  run: async (client, message, args) => {

    const duration = moment
          .duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]")


    if (args[0]) {
      let command = args[0];
      let cmd = client.commands.get(command);

      if (!cmd) {
        return message.channel.send({embeds:[{description:` The command doesnt seem to exist | :/`,color:`#29cddc`,timestamp:new Date()}]})
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
      .setPlaceholder(`Click me to get Help-menu pages & cmds`)
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
          description: "some of my utility commands",
          value: "utility",
          emoji: "⛑️"
        },
       
      ])
    )
    const row = new MessageActionRow().addComponents(
      new MessageButton()
      .setLabel("Invite me")
      .setStyle("LINK")
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=724135554966355968&permissions=2453007697&scope=bot`)
      .setEmoji(`<:wendy:924135346583797850>`),
     
     new MessageButton()
     .setLabel("Support Server")
     .setStyle("LINK")
     .setURL(`https://discord.gg/6yRpW7e3dS`)
     .setEmoji('🏠'),
     new MessageButton()
     .setLabel("vote")
     .setStyle("LINK")
     .setURL("https://top.gg/bot/724135554966355968/vote")
     .setEmoji('🌐')
    // .setDisabled()

   )

    let editEmbed = new MessageEmbed()
    .setTitle(`${client.user.username }'s Help aka  mY Command Menu`)
    .setDescription(`Heyyo,me - I am miss Wendy, Wendy marvell from Fairy tail yes!.\nBut now am  here in discord as a Discord Music Bot`)
    .addField(`__Features__`,
    `>>> An advance discord bot with a descent music play system spotify <:spotify:919582094391398430> and Soundcloud <:souncloud:919756799303888956> support
                                 Per server settings,filters and more things in upcoming updates`)
     .addField(`:question: __Using me__`,
    `>>> Ezzy pizzy ,just join a voice channel where i have proper perms and type \`w!play <song_name>\`\n or u can use the prefix set for the server instead of w!`)                            
    .addField( `<:info:919584891631448115> INFO`,
    `>>> **Prefix:** \`${DEFAULT_PREFIX}\` \n**Total Commands:** \`${client.commands.size}\`  \n**Servers:** \`${client.guilds.cache.size}\` \n **Uptime :** \`${duration}\``,true
  )                             
    .setColor("#29cddc")
    .setImage(`https://cdn.discordapp.com/attachments/735293660064776275/798941062148128818/wendy_song.gif`)

      message.channel.send({ embeds: [editEmbed], components: [helpMenu,row]}).then(msg=>{
        setTimeout(async function () {
          await msg.delete();
        }, 180000)
      })
    }
  }
};
