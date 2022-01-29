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
  //  enabled:false,
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
     
        
        if (!queue || !queue.playing) {
             
            const embed = new MessageEmbed().setDescription(` There are no songs in the queue or played :/,add some !`).setColor('#29cddc').setTimestamp().setFooter(`${queue.guild.name} Queue`, client.user.displayAvatarURL())
            return message.reply({embeds:[embed]});
       }
       if (queue.tracks.length < 1){
           message.reply({embeds:[{description:`There are no songs in queue to remove !`,color:0x29cddc,timestamp: new Date(),footer:{text:`${message.author.usename}`,icon_rul:`${message.author.displayAvatarURL()}`}}]})
       }
        const index = args.join(" ")
        if( !index) return message.reply({embeds:[{description:`Please provide a valid index of my music queue\n eg \`w!remove  1/2/3\``,color:0x29cddc}]})
       
        const index1 = (index - 1);
        if (!index1 || index1 < 0 || index1 > queue.tracks.length || !queue.tracks[index1])
      return message.reply({embeds:[{description:`Your provided song index does'nt exist.. try again!`,color:0x29cddc,timestamp:new Date()}]})

      queue.remove(index1);
        message.channel.send({
            embeds: [
                {
                    description: `Removed  song with queue no.**${index}** `,
                    color: 0xda505c
                }
            ]
        });
	}
    
    }