const { player } = require("discord-player");
const {client,message} = require ('discord.js')
const {QueryType} = require('discord-player')
const {MessageEmbed} = require("discord.js")
const { DEFAULT_PREFIX } = require("../../config.json")
const ms = require('ms');

module.exports = {
    name: "seek",
    aliases: [""],
    category: "Music",
    usage: `${DEFAULT_PREFIX}seek [time]`,
    description: "seek to a timestamp in  a song!",
    ownerOnly: false,
    nsfwOnly: false,
    //enabled:false,
   // voiceChannel:true,

    run: async (client, message, args,player) => {

        const queue = client.player.getQueue(message.guild.id);
         let seektime = args.join('')
         if (!seektime) return message.reply (` abbe time to likh le , bhakk noob!`)

        if (!queue || !queue.playing) return message.channel.send({ embeds: [{description:`**There is no song playing in server, add some !**`, color: 0x29cddc ,timestamp:new Date(),footer:{
            text: `UwU`,
            icon_url: client.user.displayAvatarURL()
        }
    
        }]});

        const timeToMS = ms(args.join(' '));

        if (timeToMS >= queue.current.durationMS) return message.channel.send({ embeds: [{description:`The indicated time is higher than current song length\n *eg--\` ${DEFAULT_PREFIX}seek <5s/10s/1m>]\`....*`, color: 0x29cddc ,timestamp:new Date(),footer:{
            text: `UwU`,
            icon_url: client.user.displayAvatarURL()
        }
    
        }]})
        //(`The indicated time is higher than the total time of the current song ${message.author}... try again ? ❌\n*Try for example a valid time like **5s, 10s, 20 seconds, 1m**...*`);

        await queue.seek(timeToMS);

        message.channel.send({
            embeds: [
                {
                    description: `Seeked to **${ms(timeToMS, { long: true })}** on the song`,
                    color: 0xda505c
                }
            ]
        });
        //(`Time set on the current song **${ms(timeToMS, { long: true })}** ✅`);

        
    }}