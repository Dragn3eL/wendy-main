const { player } = require("discord-player");
const {client,message} = require ('discord.js')
const {QueryType} = require('discord-player')
const {MessageEmbed} = require("discord.js")
const { DEFAULT_PREFIX } = require("../../config.json")

module.exports = {
    name: "shuffle",
    aliases: ["sf"],
    category: "Music",
    usage: `${DEFAULT_PREFIX}shuffle`,
    description: "shuffle our queue!",
    ownerOnly: false,
    nsfwOnly: false,
  // voiceChannel:true,

    run: async (client, message, args,player) => {

        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.reply({ embeds: [{description:`**There is no song playing in server, add some !**`, color: 0x29cddc ,timestamp:new Date(),footer:{
            text: `UwU`,
            icon_url: client.user.displayAvatarURL()
        }
    
        }]});
        //(`No music currently playing ${message.author}... try again ? ❌`);

        
        if (!queue.tracks[0]) return message.reply({ embeds: [{description:`**Not enough songs in queue to shuffle !**`, color: 0x29cddc ,timestamp:new Date(),footer:{
            text: `UwU`,
            icon_url: client.user.displayAvatarURL()
        }
    
        }]})
        //(`Not enough songs in queue to shuffle`);

        await queue.shuffle();

        return message.reply({embeds:[{description:`<a:analogtick:725928974877720677> | Queue shuffled **${queue.tracks.length}** song(s) ! `,color:0x29cddc,timestamp:new Date()}]})
    }
}