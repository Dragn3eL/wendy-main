const { player } = require("discord-player");
const {client,message} = require ('discord.js')
const {QueryType} = require('discord-player')
const {MessageEmbed} = require("discord.js")
const { DEFAULT_PREFIX } = require("../../config.json")

module.exports = {
    name: "resume",
    aliases: ["res"],
    category: "Music",
    usage: `${DEFAULT_PREFIX}resume`,
    description: "resume a paused song!",
    ownerOnly: false,
    nsfwOnly: false,
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
        if (!queue || !queue.playing) return;
        const paused = queue.setPaused(false);
		return paused ? message.react('▶️') : message.react('❌');
    
    }}