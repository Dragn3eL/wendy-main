const {MessageEmbed} = require("discord.js")
const { DEFAULT_PREFIX } = require("../../config.json")
const { QueueRepeatMode } = require('discord-player');


module.exports = {
    name: "loop",
    aliases: ["lp","repeat"],
    category: "Music",
    usage:`${DEFAULT_PREFIX}loop || repeat <off|track|queue|auto>`,
    description: "Loop the Bot playing Track/Queue",
    //voiceChannel:true,
    
    run: async (client, message, args,player) => {

        let voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply({embeds:[{description: `**Join in a voice channel first **`, color:0xe33e4a,timestamp: new Date()}]});
  
  
        const queue = client.player.getQueue(message.guild);
  
        const channel = message.member?.voice?.channel;
  
        if (queue && channel.id !== message.guild.me.voice.channel.id)
        return message.reply({embeds:[{description: `**I am already playing somewhere in the server |disconnect me from there to play**`, color:0xe33e4a,timestamp: new Date()}]});
      
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({embeds: [{description:`Be in the same \`vc\` i connect to!`,color:0xe33e4a,timestamp: new Date()}]})

       
        if (!queue) return;
        if(!args[1]) {
            if(await queue.repeatMode === QueueRepeatMode.OFF ) {
                queue.setRepeatMode(QueueRepeatMode.QUEUE);
                return message.channel.send({ embeds: [{ description: `🔄 | Looping the **queue**.`, color: 0x44b868}] });
            }
            else if(await queue.repeatMode === QueueRepeatMode.QUEUE) {
                queue.setRepeatMode(QueueRepeatMode.TRACK);
                return message.channel.send({ embeds: [{ description: `🔂 | Looping the **current track**.`, color: 0x44b868}] });
            }
            else if(await queue.repeatMode === QueueRepeatMode.TRACK) {
                queue.setRepeatMode(QueueRepeatMode.OFF);
                return message.channel.send({ embeds: [{ description: `✅ | Looping is now **disabled**.`, color: 0x44b868}] });
            }else if (await queue.repeatMode === QueueRepeatMode.AUTOPLAY){
                queue,setRepeatMode(QueueRepeatMode.AUTOPLAY);
                return message.channel.send({embeds: [{description: `|Loop is now in **autoplay**`,color: `#29cddc`}]})
            }
        }
        const option = args[1];
        if(option.includes("off") || option.includes("disable") || option.includes("none")) { 
            queue.setRepeatMode(QueueRepeatMode.TRACK);
            return message.react("✅");
        }
        else if(option.includes("track") || option.includes("song") || option.includes("current")) {
            queue.setRepeatMode(QueueRepeatMode.QUEUE);
            return message.react("🔂");
        }
        else if(option.includes("queue") || option.includes("all")) {
            queue.setRepeatMode(QueueRepeatMode.OFF);
            return message.react("🔄");
        }
        else if(option.includes("autoplay")){
            queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
            return message.react("▶️");
        }
        else {
            const embed = new MessageEmbed()
            embed.setColor('#44b868');
            let mode;
            if(await queue.repeatMode === QueueRepeatMode.OFF) mode = "`Off`";
            else if(await queue.repeatMode === QueueRepeatMode.TRACK) mode = "`Track`";
            else if(await queue.repeatMode === QueueRepeatMode.QUEUE) mode = "`Queue`";
            else if(await queue.repeatMode === QueueRepeatMode.AUTOPLAY) mode = "`Autoplay`";
			embed.setDescription(`Current loop mode: ${mode}\nOptions: off, track, queue, autoplay`);
            message.channel.send({embeds: [embed]});
        }
	}
}

    