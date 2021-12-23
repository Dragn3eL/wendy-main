const { player } = require("discord-player");
const {client,message} = require ('discord.js')
const {QueryType} = require('discord-player')
const {MessageEmbed} = require("discord.js")
const { DEFAULT_PREFIX } = require("../../config.json")

module.exports = {
    name: "skip",
    aliases: ["sk"],
    category: "Music",
    usage: `${DEFAULT_PREFIX}skip`,
    description: "Skips to the next song in the queue!",
    ownerOnly: false,
    nsfwOnly: false,
 //   voiceChannel:true,

    run: async (client, message, args,player) => {
        
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ embeds: [{description:`**There is no song playing in server, add some !**`, color: 0x29cddc ,timestamp:new Date(),footer:{
            text: `UwU`,
            icon_url: client.user.displayAvatarURL()
        }
    }]});


    const ok = queue.skip();
    if (ok) return message.reply({embeds:[{description:`**Skipped the currrent music**`,color:0x29cddc,timestamp:new Date(),footer:{
        text: `(6-6) by- ${message.author.tag}`,
        icon_url:message.author.displayAvatarURL()
    }
}]});



    }}