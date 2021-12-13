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
    run: async (client, message, args,player) => {

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
         const repeat = client.player.getQueue(message.guild.id).repeatMode ? `Yes`:`NO`
            const methods = [`disabled`,`track`,`queue`]
          let np = new MessageEmbed()
            .setColor('#29cddc')
            .setThumbnail(track.thumbnail)
            .setAuthor(`Now playing in ${queue.guild.name}`,message.guild.iconURL())
            .setTitle(` ${track.title}`).setURL(`${track.url}`)
           
            
            .addField(`:?|Requested by`,track.requestedBy.toString(), true)
            .addField(`:D|Channel`,track.author,true)
            .addField(`:-O|Info`,`Volume : \`${queue.volume}\`| Loop mode \`${repeat}| ${methods[queue.repeatMode]}\``)
            .addField(`\u200b`,`${progresss}(**${trackduration}**%)`)
           
            
           
            .setTimestamp()
            .setFooter(`Hope u are enjoyin the music <3`,message.author.displayAvatarURL())
            
        message.channel.send({embeds:[np]}).catch((e)=> console.log(e))






    }
}