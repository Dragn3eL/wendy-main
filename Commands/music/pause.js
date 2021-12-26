const { player } = require("discord-player");
const {client} = require ('discord.js')
const {QueryType} = require('discord-player')
const {MessageEmbed} = require("discord.js")

module.exports = {
    name: "pause",
    aliases: ["pa"],
    category: "Music",
    usage: "pause",
    description: "Pause a playing song!",
    ownerOnly: false,
  //  voiceChannel:true,
    nsfwOnly: false,
    run: async (client, message, args,player) => {
        let voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply({embeds:[{description: `**Join in a voice channel first **`, color:0xe33e4a,timestamp: new Date()}]});
  
  
  
        const gqueue = client.player.getQueue(message.guild.id);
  
        const channel = message.member?.voice?.channel;
  
        if (gqueue && channel.id !== message.guild.me.voice.channel.id)
        return message.reply({embeds:[{description: `**I am already playing somewhere in the server |disconnect me from there to play**`, color:0xe33e4a,timestamp: new Date()}]});
      
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({embeds: [{description:`Be in the same \`vc\` i connect to!`,color:0xe33e4a,timestamp: new Date()}]})
    
    const queue = client.player.getQueue(message.guild.id)
    let noqueue = new MessageEmbed().setColor("#29cddc").setDescription(`Currently not playing anything  in guild`).setTimestamp()
    if (!queue || !queue.playing) return message.reply({embeds:  [noqueue]}).then (async(message) => {
        setTimeout(()=> message.delete(), 5000)
    }).catch()


     if (queue.connection.paused){
     let alreadyPaused = new MessageEmbed().setColor("#29cddc").setDescription(`The song is already **Paused**`).setTimestamp().setFooter(`(.❛ ᴗ ❛.)`,client.user.displayAvatarURL())
 return message.reply ( {embeds :  [alreadyPaused], ephemeral: true}).then(async(m)=>{
     setTimeout(() => {
         m.delete()
     }, 3000);
 })
     }

     const success = queue.setPaused(true)
 let sucess = new MessageEmbed().setColor("#d33443").setDescription(`Song ${queue.current.title} \`PAUSED\``).setTimestamp().setFooter(`Paused by ${message.author.tag}`,message.author.displayAvatarURL())
  if (success) message.channel.send({embeds: [sucess]}).then(async(msg) =>{
      setTimeout(() => {
          msg.delete()
      }, 10000);
  }).catch()

    
    
    
    
    
    
    
    
    
    
    
    
  }
}