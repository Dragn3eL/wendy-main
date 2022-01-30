//const { MessageEmbed } = require("discord.js");
//const { QueueRepeatMode } = require('discord-player')
const {client,message, Interaction} = require ('discord.js')
const Discord = module.require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const { MessageEmbed , MessageActionRow, MessageButton } = require("discord.js");
const { QueueRepeatMode } = require('discord-player');
const { isAsyncFunction } = require('util/types');

module.exports = async( queue,track,client,message, args,) => {
   


    if (!client.utils.havePermissions(queue.metadata.channel)) return;

// const song = client.player.getQueue(message.guild.id);

    const embed = new Discord.MessageEmbed()
      .setColor("#29cddc")
      .setAuthor(`Playing 🎸 `,`https://cdn.discordapp.com/attachments/726134541638697042/798842241145765958/Music.gif`)
      .setTimestamp()
      .setDescription(`[${track.title}](${track.url})  **[**${track.requestedBy.toString()}**]**`)
      .addFields(
	    { name: 'Views', value: `\`${track.views}\``,inline:true },
	   	{ name: 'Duration', value: `\`${track.duration}\`` , inline: true },
	 )
       .setThumbnail(track.thumbnail)
      .setFooter(` mOOSIc IN ${queue.guild.name}`,client.user.displayAvatarURL());

  // .setTitle("Now playing")
  // .setColor(queue.guild.me.displayColor || "BLUE")
  // .setDescription(`[${track.title}](${track.url}) ~ [${track.requestedBy.toString()}]`)
  // .setImage(`${track.thumbnail}`);
      

   // await queue.metadata.channel.send({ embeds: [embed] });



  const playPause = new MessageButton()
  .setCustomId("playPause")
  .setStyle("SUCCESS")
  .setLabel("Pause")

  const skip = new MessageButton()
  .setCustomId("skip")
  .setStyle("SUCCESS")
  .setLabel("Skip")

  const repeat = new MessageButton()
  .setCustomId("repeat")
  .setStyle("SUCCESS")
  .setLabel("Loop")

  const stop = new MessageButton()
  .setCustomId("stop")
  .setStyle("DANGER")
  .setLabel("Stop")

  const shuffle = new MessageButton()
  .setCustomId("shuffle")
  .setStyle("SUCCESS")
  .setLabel("Shuffle")

  const volumeLess = new MessageButton()
  .setCustomId("volumeLess")
  .setStyle("SUCCESS")
  .setEmoji("🔉")

  const volumeMore = new MessageButton()
  .setCustomId("volumeMore")
  .setStyle("SUCCESS")
  .setEmoji("🔊")

  // A row cannot have more than 4 components!
  const controlRow1 = new MessageActionRow()
  .addComponents([playPause], [skip], [repeat], [stop],[shuffle])

  const controlRow2 = new MessageActionRow()
  .addComponents([shuffle])

  const playMessage = await queue.metadata.channel.send({ embeds: [embed], components: [controlRow1] }).then(async(msg)=>{
    /**
     * Function to delete the message after the stop button is used
     */
    async function usedStop() {
      await msg.delete()
    }
    // Delete message after song has ended!
    setTimeout(async function(){
      if (msg && !msg.deleted) {
        return await usedStop();
      } else {
        return;
      }
    }, track.durationMS)
       
  const filter = (user) =>  !user.bot ||user.id === queue.metadata.member.id;

  var collector = await msg.createMessageComponentCollector(filter, {
    time: track.duration  > 0 ? track.duration * 1000 : 600000
  });

  collector.on("collect", async(button, user) => {
    if (!queue) return;
    if (!track.durationMS) {
      collector.stop();
    }

    switch (button.customId) {
 
      case "playPause":
        await button.deferUpdate();
      //  if (!client.utils.canModifyQueue(queue.metadata)) return;

        if (!queue.connection.paused) {
          queue.setPaused(true);

const pause = new MessageEmbed()
          .setColor('#ee1616')
          .setDescription(`Paused the music`)
          .setTimestamp()
         // .setThumbnail('https://cdn.discordapp.com/attachments/726134541638697042/731828280814207016/play-pause.gif')
         .setFooter(`UwU`,client.user.displayAvatarURL())

          return queue.metadata.channel.send({embeds:[pause],ephemeral:true }).then(async(msg)=> {
      setTimeout(() => msg.delete(), 8000)
  })
  .catch()





          
        } else if (queue.connection.paused) {
          queue.setPaused(false);
          const resume = new MessageEmbed()
          .setColor('#7be58b')
          .setDescription(`Resumed  music`)
          .setTimestamp()
          .setFooter(`ヅ`,`https://cdn.discordapp.com/emojis/775531595620417536.gif?v=1`)
          return queue.metadata.channel.send({ embeds:[resume], ephemeral: true }).then(async(msg)=> {
            setTimeout(() => msg.delete(), 8000)
        })
        .catch()
        }
        break;
      
      case "skip":
        await button.deferUpdate();
        //if (!client.utils.canModifyQueue(queue.metadata)) return;

        if (queue.tracks.length < 1 && queue.repeatMode !== 2) {
          const nosongs = new MessageEmbed().setColor("#ee1616").setDescription(`Currently no of songs in the queue are less to skip :(`).setTimestamp().setFooter(`ت`,`https://cdn.discordapp.com/attachments/726134541638697042/799268980963541012/ezgif.com-gif-maker_17.gif`)
          return queue.metadata.channel.send({ embeds:[nosongs], ephemeral: true }).then(async(msg)=> {
            setTimeout(() => msg.delete(), 3000)
        })
      
        } else {
          queue.skip();
          usedStop();
          const skip = new MessageEmbed().setColor("#29cddc").setDescription(`Skipping current music`).setFooter(`㋡`,`https://cdn.discordapp.com/attachments/726134541638697042/799268980963541012/ezgif.com-gif-maker_17.gif`).setTimestamp()
          queue.metadata.channel.send({ embeds:[skip], ephemeral: true }).then(async(msg)=> {
            setTimeout(() => msg.delete(), 3000)
        })
        .catch()
        }
        break;

      case "repeat":
        await button.deferUpdate();
       // if (!client.utils.canModifyQueue(queue.metadata)) return;
        if (!queue.repeatMode) {
          queue.setRepeatMode(QueueRepeatMode.QUEUE)
          const enabled = new MessageEmbed().setColor("#7be58b").setDescription("Loop mode is now **enabled**!").setFooter('ｼ',`https://cdn.discordapp.com/emojis/775531595620417536.gif?v=1`).setTimestamp()
          queue.metadata.channel.send({ embeds:[enabled], ephemeral: true}).then(async(msg)=> {
            setTimeout(() => msg.delete(), 3000)
        })
        .catch()//#7be58b //#ee1616
        } else if (queue.repeatMode) {
          queue.setRepeatMode(QueueRepeatMode.OFF)
          const disabled = new MessageEmbed().setColor("#29cddc").setDescription("Loop mode has been **disabled**!").setFooter('ｼ',`https://cdn.discordapp.com/emojis/775531595620417536.gif?v=1`).setTimestamp()
          queue.metadata.channel.send({ embeds:[disabled], ephemeral: true}).then(async(msg)=> {
            setTimeout(() => msg.delete(), 3000)
        })
        .catch()
        }
        break;
        
      case "stop":
        await button.deferUpdate();
        //if (!client.utils.canModifyQueue(queue.metadata)) return;
       
       // if (queue.destroyed) return console.log("Cannot go further because the queue is destroyed");
       queue.stop(true);
        
        const stopped = new MessageEmbed().setColor("#ee1616").setDescription("Music \`Stopped\`").setFooter(`cya`,`https://images-ext-2.discordapp.net/external/gqq_mBremfXf6kiRqU1HYo8ZRm9Wa0PI32WNuW6VWy8/https/cdn.discordapp.com/emojis/809969812984954890.gif`).setTimestamp()
        queue.metadata.channel.send({ embeds:[stopped], ephemeral: true }).then(async(msg)=> {
          setTimeout(() => msg.delete(), 9000)
      })
      
      .catch()
      
        usedStop();
        collector.stop();
        break;
        
      case "shuffle":
        await button.deferUpdate();
       // if (!client.utils.canModifyQueue(queue.metadata)) return;
       const shuffle = new MessageEmbed().setColor("29cddc").setDescription("No of songs in queue are too less to shuffle").setFooter(':3',`https://cdn.discordapp.com/emojis/775531595620417536.gif?v=1`).setTimestamp()
        if (queue.tracks.length < 3) return queue.metadata.channel.send({ embed:[shuffle], ephemeral: true}).then(async(msg)=> {
          setTimeout(() => msg.delete(), 3000)
      })
      .catch()
        queue.shuffle();
        let shufflingEmbed = new MessageEmbed().setColor("#29cddc").setDescription(`**Aye shuffling thy  queue**`).setThumbnail(`https://cdn.discordapp.com/attachments/726134541638697042/798842241145765958/Music.gif`)
        queue.metadata.channel.send({ embeds:[shufflingEmbed]}).then (async(m) =>
          {
            let shuffled = new MessageEmbed().setColor("#29cddc").setDescription(`<a:analogtick:725928974877720677> **Shuffled your queue**`).setTimestamp().setFooter('ӭ',`https://cdn.discordapp.com/emojis/775531595620417536.gif?v=1`)
           setTimeout (() => m.edit({embeds:[shuffled]}),2000 )
          })
        break;
        
      case "volumeLess":
        await button.deferUpdate();
        if (!client.utils.canModifyQueue(queue.metadata)) return;
        let vol;
        if (queue.volume === 0) return queue.metadata.followUp({ content: "Volume cannot be lower than 0!", ephemeral: true})
        if (queue.volume - 10 <= 0) vol = 0
        else vol = queue.volume - 10;
        queue.setVolume(Number(vol));
        queue.metadata.followUp({ content: `Volume set to ${queue.volume}%`, ephemeral: true})
        break;
        
      case "volumeMore":
        await button.deferUpdate();
        if (!client.utils.canModifyQueue(queue.metadata)) return;
        let volume;
        if (queue.volume === 130) return queue.metadata.followUp({ content: "Volume cannot be higher than 130!", ephemeral: true})
        if (queue.volume + 10 >= 130) volume = 130;
        else volume = queue.volume + 10;
        queue.setVolume(Number(volume));
        queue.metadata.followUp({ content: `Volume set to ${queue.volume}%`, ephemeral: true})
        break;

      default: return;
    }
  });

    collector.on("end", () => {
      console.log("Queue ended!")
    })
  }).catch()
}




