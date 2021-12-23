const { player } = require("discord-player");
const {client,message} = require ('discord.js')
const {QueryType} = require('discord-player')
const {MessageEmbed} = require("discord.js")
const { DEFAULT_PREFIX } = require("../../config.json")

module.exports = {
    name: "stop",
    aliases: ['dc','bye',''],
    category: "Music",
    usage: `${DEFAULT_PREFIX}dc `,
    description: "Disconnects the bot from the channel!",
    ownerOnly: false,
    nsfwOnly: false,
  //  voiceChannel:true,

     //enabled:false,
    run: async (client, message, args,player) => {


        const queue = client.player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.channel.send({ embeds: [{description:`**There is no song playing in server, add some !**`, color: 0x29cddc ,timestamp:new Date(),footer:{
            text: `UwU`,
            icon_url: client.user.displayAvatarURL()
        }
    }]});
    if (queue) queue.destroy(true);
    
    message.react('👋');


        
    }}