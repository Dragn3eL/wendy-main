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

        let voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply({embeds:[{description: `**Join in a voice channel first **`, color:0xe33e4a,timestamp: new Date()}]});
  
  
  
        const gqueue = client.player.getQueue(message.guild.id);
  
        const channel = message.member?.voice?.channel;
  
        if (gqueue && channel.id !== message.guild.me.voice.channel.id)
        return message.reply({embeds:[{description: `**I am already playing somewhere in the server |disconnect me from there to play**`, color:0xe33e4a,timestamp: new Date()}]});
      
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({embeds: [{description:`Be in the same \`vc\` i connect to!`,color:0xe33e4a,timestamp: new Date()}]})

        const queue = client.player.getQueue(message.guild.id);
        const song = queue.current

         if (song.live)
         return message.reply({embeds:[{description: `**Can't seek in this song**`, color:0xe33e4a,timestamp: new Date()}]});
         let seektime = args.join('')
         if (!seektime) return message.reply (`Please provide the time duration!.\`w!seek 10s/ 1m\``)

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
                    color: 0x4cc64c
                }
            ]
        });
        //(`Time set on the current song **${ms(timeToMS, { long: true })}** ✅`);

        
    }}