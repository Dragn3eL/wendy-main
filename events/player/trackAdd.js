const { MessageEmbed } = require("discord.js");

module.exports = async(queue, track) => {
    if (!queue.playing || queue.tracks.length <= 0) return;

    const embed = new MessageEmbed()
      .setTitle(`Track queued - Position ${queue.tracks.indexOf(track) +1}`)
      .setDescription(`[${track.title}](${track.url}) ~ [${track.requestedBy.toString()}]`)
      .setColor( "#29cddc");

    return queue.metadata.channel.send({ embeds: [embed], allowedMentions: { repliedUser: false } }).catch(console.error);

};
