//const { MessageEmbed } = require("discord.js");
//const { QueueRepeatMode } = require('discord-player')
const {client,message} = require ('discord.js')
const Discord = module.require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const { MessageEmbed , MessageActionRow, MessageButton } = require("discord.js");
const { QueueRepeatMode } = require('discord-player')

module.exports = async( queue,track,client,message, args) => {
    if (!client.utils.havePermissions(queue.metadata.channel)) return;

// const song = client.player.getQueue(message.guild.id);

    const embed = new Discord.MessageEmbed()
      .setColor("#29cddc")
      .setAuthor(`Playing 🎸 `,`https://cdn.discordapp.com/attachments/726134541638697042/798842241145765958/Music.gif`)
      .setTimestamp()
      .setDescription(`[${track.title}](${track.url})~ ${track.requestedBy.toString()}`)
      .addFields(
	    { name: 'Views', value: `\`${track.views}\``,inline:true },
	   	{ name: 'Duration', value: `\`${track.duration}\`` , inline: true },
	 )
       .setThumbnail(track.thumbnail)
      .setFooter(`UwU`,client.user.displayAvatarURL());

  // .setTitle("Now playing")
  // .setColor(queue.guild.me.displayColor || "BLUE")
  // .setDescription(`[${track.title}](${track.url}) ~ [${track.requestedBy.toString()}]`)
  // .setImage(`${track.thumbnail}`);
      

   // await queue.metadata.channel.send({ embeds: [embed] });



  const playPause = new MessageButton()
  .setCustomId("playPause")
  .setStyle("SUCCESS")
  .setEmoji("⏯")

  const skip = new MessageButton()
  .setCustomId("skip")
  .setStyle("SUCCESS")
  .setEmoji("⏭")

  const repeat = new MessageButton()
  .setCustomId("repeat")
  .setStyle("SUCCESS")
  .setEmoji("🔁")

  const stop = new MessageButton()
  .setCustomId("stop")
  .setStyle("SUCCESS")
  .setEmoji("⏹")

  const shuffle = new MessageButton()
  .setCustomId("shuffle")
  .setStyle("SUCCESS")
  .setEmoji("🔀")

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
  .addComponents([playPause], [skip], [repeat], [stop], [shuffle])

  const controlRow2 = new MessageActionRow()
  .addComponents([volumeLess], [volumeMore])

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
       
  const filter = (user) => user.id === queue.metadata.member.id;

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
          .setDescription(`Paused the music\nType slash resume or w!resume to resume`)
          .setTimestamp()
         // .setThumbnail('https://cdn.discordapp.com/attachments/726134541638697042/731828280814207016/play-pause.gif')
         .setFooter(`UwU`,client.user.displayAvatarURL())

      


          return queue.metadata.channel.send({embeds:[pause],ephemeral:true }).then(msg => {
    queue.metadata.delete()
    setTimeout(() => msg.delete(), 2000)
  })
  .catch()





          
        } else if (queue.connection.paused) {
          queue.setPaused(false);
          return queue.metadata.channel.send({ content: "Resumed the music!", ephemeral: true })
        }
        break;
      
      case "skip":
        await button.deferUpdate();
        //if (!client.utils.canModifyQueue(queue.metadata)) return;

        if (queue.tracks.length < 3 && queue.repeatMode !== 3) {
          return queue.metadata.followUp({ content: "No more songs in the queue to skip!", ephemeral: true })
        } else {
          queue.skip();
          queue.metadata.followUp({ content: "Skipped the current song!", ephemeral: true })
        }
        break;

      case "repeat":
        await button.deferUpdate();
       // if (!client.utils.canModifyQueue(queue.metadata)) return;
        if (!queue.repeatMode) {
          queue.setRepeatMode(QueueRepeatMode.QUEUE)
          queue.metadata.followUp({ content: "Loop mode has been enabled!", ephemeral: true})
        } else if (queue.repeatMode) {
          queue.setRepeatMode(QueueRepeatMode.OFF)
          queue.metadata.followUp({ content: "Loop mode has been disabled!", ephemeral: true})
        }
        break;
        
      case "stop":
        await button.deferUpdate();
        //if (!client.utils.canModifyQueue(queue.metadata)) return;
        queue.stop();
        queue.metadata.followUp({ content: "Stopped the music!", ephemeral: true })
        usedStop();
        collector.stop();
        break;
        
      case "shuffle":
        await button.deferUpdate();
       // if (!client.utils.canModifyQueue(queue.metadata)) return;
        if (queue.tracks.length < 3) return queue.metadata.followUp({ content: "Need atleast `3` songs in the queue to shuffle!", ephemeral: true})
        queue.shuffle();
        queue.metadata.followUp({ content: "Shuffled the queue!", ephemeral: true})
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
  });
};
