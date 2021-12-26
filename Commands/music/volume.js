const { player } = require("discord-player");
const {client,message} = require ('discord.js')
const {QueryType} = require('discord-player')
const {MessageEmbed} = require("discord.js")
const { DEFAULT_PREFIX } = require("../../config.json")
const maxVolume = 100;

module.exports = {
    name: "volume",
    aliases: ["vol"],
    category: "Music",
    usage: `${DEFAULT_PREFIX}vol <number>`,
    description: "sets volume of the music!",
    ownerOnly: false,
    nsfwOnly: false,
    //voiceChannel:true,

     //enabled:false,
    run: async (client, message, args,player) => {
        let voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply({embeds:[{description: `**Join in a voice channel first **`, color:0xe33e4a,timestamp: new Date()}]});
  
  
  
        const gqueue = client.player.getQueue(message.guild.id);
  
        const channel = message.member?.voice?.channel;
  
        if (gqueue && channel.id !== message.guild.me.voice.channel.id)
        return message.reply({embeds:[{description: `**I am already playing somewhere in the server |disconnect me from there to play**`, color:0xe33e4a,timestamp: new Date()}]});
      
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({embeds: [{description:`Be in the same \`vc\` i connect to!`,color:0xe33e4a,timestamp: new Date()}]})

        const maxVolume = 100;


        const queue = client.player.getQueue(message.guild);
        if (!queue || !queue.playing) {
            const embed = new MessageEmbed();
            embed.setColor('#e94e5c');
            embed.setDescription(`There's nothing currently playing in the server.`);
            embed.setTimestamp()
            return message.reply({ embeds: [embed] });
        }

        // returns the current volume, instructions for adjusting the volume if theres no args
        const vol = parseInt(args[0]);
        if (!vol) {
            const embed = new MessageEmbed();
            embed.setColor('#29cddc')
            embed.setTimestamp()
            //('#44b868');
            embed.setDescription(`<:speakerr:923439974601326642> Current volume **${queue.volume}** \n*↪ Enter \`w!vol <number>\` and number between \`1\` and \`${maxVolume}\` to change the volume.*`);
            return message.reply({ embeds: [embed] });
        }

        // checks if the volume has already set on the requested value
        if (queue.volume === vol) {
            const embed = new MessageEmbed();
            embed.setTimestamp()
            embed.setColor('#bb34ff');
            embed.setDescription(`I am having the same volume as your input. \n**↪ \`Try a different number 0.0\`**`);
            return message.reply({ embeds: [embed] });
        }

        // checks the requested value is valid
        if (vol < 0 || vol > maxVolume) {
            const embed = new MessageEmbed();
            embed.setColor('#d74e4e');
            embed.setTimestamp()
            embed.setDescription(`:I Thats not a valid number. \n*↪ Please enter between \`1\` and \`${maxVolume}\` to change the volume.*`);
            return message.reply({ embeds: [embed] });
        }

        const success = queue.setVolume(vol);
        message.channel.send({embeds:[{description:`Your volume is now set to  \`${vol}\` `,color:0x83d005,timestamp: new Date()}]})
        return message.react(success ? `✅` : `❌`)
        
    }}