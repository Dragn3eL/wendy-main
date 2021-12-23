const {MessageEmbed} = require("discord.js")
const { DEFAULT_PREFIX } = require("../../config.json")
const { QueueRepeatMode } = require('discord-player');
const { ownerOnly } = require("../Config/djrole");



module.exports = {
    name: "clearqueue",
    description: "clears the entire queue",
    category: "Music",
    usage:`${DEFAULT_PREFIX}cq`,
    permission: "SEND_MESSAGES",
    aliases: ["cq"],
    // ownerOnly:true,
    // enabled:false,
    voiceChannel:true,
   
   run :async (client,message, args) => {
    // if (!message.member.voice.channel) return ({embeds:[{description: `**You need to be in a voice channel**`, color:0xe33e4a,timestamp: new Date()}]})

    // if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channel) return message.channel.send({embeds: [{description:`Be in the same \`vc\` i connect to!`,color:0xe33e4a,timestamp: new Date()}]})

    const queue= client.player.getQueue(message.guild.id)

    if (!queue || !queue.playing) return message.reply({ embeds: [{description:`**There is no song playing in server, add some !**`, color: 0x29cddc ,timestamp:new Date(),footer:{
        text: `UwU`,
        icon_url: client.user.displayAvatarURL()
    }

    }]});

     if (!queue.tracks[0]) return message.reply({ embeds: [{description:`**Not more  than enough tracks in queue to clear !**`, color: 0x29cddc ,timestamp:new Date(),footer:{
        text: `TwT`,
        icon_url: client.user.displayAvatarURL()
    }

    }]});
     //(`No music in the queue after the current one ${message.author}... try again ? ❌`);
  
     await queue.clear();
     message.react('✅');

        message.channel.send({ embeds:[   {  description:`☑️ Your queue has been cleared `,color:0x29cddc,timestamp: new Date()
    } ]}).then(async(m)=>{
        setTimeout(() => 
            m.delete()
        , 4000);
    })
       // (`The queue has just been cleared 🗑️`);
    


















   }
}