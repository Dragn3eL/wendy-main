const { player } = require("discord-player");
const {client,message} = require ('discord.js')
const {QueryType} = require('discord-player')
const {MessageEmbed} = require("discord.js")
const { DEFAULT_PREFIX } = require("../../config.json")

module.exports = {
    name: "grab",
    aliases: ["gb"],
    category: "Music",
    usage: `${DEFAULT_PREFIX}grab`,
    description: "save a song in bot dm!",
    ownerOnly: true,
    enabled:false,
    nsfwOnly: false,
  //  voiceChannel:true,
    run: async (client, message, args,player) => {
      let voiceChannel = message.member.voice.channel;
      if (!voiceChannel) return message.reply({embeds:[{description: `**Join in a voice channel first **`, color:0xe33e4a,timestamp: new Date()}]});



      const gqueue = client.player.getQueue(message.guild.id);

      const channel = message.member?.voice?.channel;

      if (gqueue && channel.id !== message.guild.me.voice.channel.id)
      return message.reply({embeds:[{description: `**I am already playing somewhere in the server |disconnect me from there to play**`, color:0xe33e4a,timestamp: new Date()}]});
    
      if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({embeds: [{description:`Be in the same \`vc\` i connect to!`,color:0xe33e4a,timestamp: new Date()}]})
        
      if (!gqueue ||!gqueue.playing) return message.channel.send({embeds:[{description:`There is no music playing  in  the server`,color:0x29cddc,timestamp:new Date()}]})

      message.author.send({embeds:[{description:` ✅ Saved  the  track  (${gqueue.current.title}[${gqueue.current.url}] || ${queue.current.author})`,color:0x29cddc,timestamp: new Date(),footer:{text: `From ${gqueue.guild.name}`,icon_url:`${message.guild.iconURL()}`}}]}).then(() =>{
        message.channel.send({embeds:[{description:`Grabbed the song for you in dm UwU`}]})
      }).catch(error =>{
        message.channel.send({embeds:[{description:`Can't send priavte message! Gomenasai  :I`,color:0xc24752,timestaml:new Date()}]})
      })




   
    }}