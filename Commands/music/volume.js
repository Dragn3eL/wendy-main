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
        const maxVolume = 100;


        const queue = client.player.getQueue(message.guild);
        if (!queue || !queue.playing) {
            const embed = new MessageEmbed();
            embed.setColor('#b84e44');
            embed.setDescription(`There's nothing currently playing in the server.`);
            return message.reply({ embeds: [embed] });
        }

        // returns the current volume, instructions for adjusting the volume if theres no args
        const vol = parseInt(args[1]);
        if (!vol) {
            const embed = new MessageEmbed();
            embed.setColor('#29cddc')
            //('#44b868');
            embed.setDescription(`Current volume is set on <:speakerr:923439974601326642> **${queue.volume}** \n*↳ Enter \`w!vol <number>\` and number between \`1\` and \`${maxVolume}\` to change the volume.*`);
            return message.reply({ embeds: [embed] });
        }

        // checks if the volume has already set on the requested value
        if (queue.volume === vol) {
            const embed = new MessageEmbed();
            embed.setColor('#bb34ff');
            embed.setDescription(`I am having the same volume as your input. \n**↳ \`Try a different number 0.0\`**`);
            return message.reply({ embeds: [embed] });
        }

        // checks the requested value is valid
        if (vol < 0 || vol > maxVolume) {
            const embed = new MessageEmbed();
            embed.setColor('#b84e44');
            embed.setDescription(`:I Thats not a valid number. \n*↳ Please enter between \`1\` and \`${maxVolume}\` to change the volume.*`);
            return message.reply({ embeds: [embed] });
        }

        const success = queue.setVolume(vol);
        message.channel.send({embeds:[{description:`Your volume is now set to  \`${vol}\` `}]})
        return message.react(success ? `✅` : `❌`)
        
    }}