const { player } = require("discord-player");
const {client,message} = require ('discord.js')
const {QueryType} = require('discord-player')
const {MessageEmbed} = require("discord.js")
const { DEFAULT_PREFIX } = require("../../config.json")

module.exports = {
    name: "remove",
    aliases: ["rm"],
    category: "Music",
    usage: `${DEFAULT_PREFIX}remove <index no>`,
    description: "Remove a song from the server Queue!",
    ownerOnly: false,
    nsfwOnly: false,
    enabled:false,
   // voiceChannel:true,
    run: async (client, message, args,player) => {
        let voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply({embeds:[{description: `**Join in a voice channel first **`, color:0xe33e4a,timestamp: new Date()}]});
  
  
  
        const gqueue = client.player.getQueue(message.guild.id);
  
        const channel = message.member?.voice?.channel;
  
        if (gqueue && channel.id !== message.guild.me.voice.channel.id)
        return message.reply({embeds:[{description: `**I am already playing somewhere in the server |disconnect me from there to play**`, color:0xe33e4a,timestamp: new Date()}]});
      
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({embeds: [{description:`Be in the same \`vc\` i connect to!`,color:0xe33e4a,timestamp: new Date()}]})
    
        const queue = client.player.getQueue(message.guild);
        if (!queue || !args[1]) return;
        const trackIndex = args[1] - 1;
        if(!queue.tracks[trackIndex]) return;
        const trackName = queue.tracks[trackIndex].title;
        const trackUrl = queue.tracks[trackIndex].url;
        queue.remove(trackIndex);

        message.channel.send({
            embeds: [
                {
                    description: `Removed [${trackName}](${trackUrl})`,
                    color: 0xda505c
                }
            ]
        });
	}
    
    }