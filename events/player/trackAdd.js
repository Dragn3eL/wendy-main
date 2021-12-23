
const Discord = module.require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const { MessageEmbed , MessageActionRow, MessageButton } = require("discord.js");
const { QueueRepeatMode } = require('discord-player');

module.exports = async(queue, track,client) => {
    if (!queue.playing || queue.tracks.length <= 0) return;

    const embed = new MessageEmbed()
      .setAuthor(`Added to queue  `,`https://images-ext-1.discordapp.net/external/y9xo3cmx7zqBCO5_G8ihraaodI-Ga8ZNbTYeP6MdVPk/https/cdn.discordapp.com/emojis/763415718271385610.gif`)
      .setDescription(`**[${track.title}](${track.url})** ~ [${track.requestedBy.toString()}]`)
      .setColor( "#29cddc").setThumbnail(track.thumbnail)
      .addField(`Position in  queue`,`${queue.tracks.indexOf(track) +1}`,true)
      .addField(`Duration`,`\`${track.duration}\``,true)
      .addField(`Channel`,`${track.author}`,true)
      .setTimestamp()
      .setFooter(`${queue.guild.name}`,`https://images-ext-2.discordapp.net/external/HaZoqpEVO4ialyWwvqJ8_92pfURr3vPZo2J5nxwr7oY/https/cdn.discordapp.com/emojis/831985215928664135.png`)
    return queue.metadata.channel.send({ embeds: [embed], allowedMentions: { repliedUser: false } }).catch((e )=> console.log(e))
};
