const { player } = require("discord-player");
const {client} = require ('discord.js')
const {QueryType} = require('discord-player')
const {MessageEmbed} = require("discord.js")
const { DEFAULT_PREFIX } = require("../../config.json")

module.exports = {
    name: "nowplaying",
    aliases: ["np"],
    category: "Music",
    usage:`${DEFAULT_PREFIX}np`,
    description: "Displays info about the current song played",
    ownerOnly: false,
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


        const queue = client.player.getQueue(message.guild.id)
         if (!queue|| !queue.playing){
            const embed = new MessageEmbed()
            .setColor('#29cddc')
            .setDescription(`Nothing's curently being played in the server\n use w!play to play something`)
            .setTimestamp() 
            return message.channel
            .send({embed:[embed]})
         }
         const track = queue.current;
         const timestamp = queue.getPlayerTimestamp();
         const trackduration= timestamp.progress == 'No End' ? 'Live 🔴' : track.duration

         const progresss = queue.createProgressBar()
         const repeat = client.player.getQueue(message.guild.id).repeatMode ? `ON`:`OFF`
            const methods = [`Disabled`,`Track`,`Queue`]
          let np = new MessageEmbed()
            .setColor('#29cddc')
            .setThumbnail(track.thumbnail)
            .setAuthor(`Now playing in ~ \n${queue.guild.name}`,message.guild.iconURL())
            .setTitle(` ${track.title}`).setURL(`${track.url}`)
            .setDescription(`👍 Joined ${queue.connection.channel.toString()} and 📄 bound to ${queue.metadata.channel.toString()}`)
           
            
            .addField(`Requested by`,track.requestedBy.toString(), true)
            .addField(`Channel`,track.author,true)
            .addField(`Info`,`Volume : \`${queue.volume}\`| Loop mode \`${repeat}| ${methods[queue.repeatMode]}\``)
            .addField(`\u200b`,`${progresss}(**${trackduration}**%)`)
           
            
           
            .setTimestamp()
            .setFooter(`Hope u are enjoyin the music <3`,message.author.displayAvatarURL())
            
        message.channel.send({embeds:[np]}).catch((e)=> console.log(e))






    }
}