const { MessageEmbed } = require("discord.js");

module.exports = async(queue, tracks, client) => {

   
    const embed = new MessageEmbed()
    .setAuthor(`Playlist Enquired   `,`https://images-ext-1.discordapp.net/external/y9xo3cmx7zqBCO5_G8ihraaodI-Ga8ZNbTYeP6MdVPk/https/cdn.discordapp.com/emojis/763415718271385610.gif`)
    .setDescription(`**Songs Grabbed** **\`${tracks.length}\`**\n**Playlist Name:** [${tracks[0].playlist.title}](${tracks[0].playlist.url})`)
    .setColor( "#29cddc").setThumbnail(tracks[0].playlist.thumbnail).setTimestamp()
    
   // .addField(`Duration`,`${track.duration}`,true).setTimestamp()
   

   return queue.metadata.channel.send({ embeds: [embed], allowedMentions: { repliedUser: false } }).catch(console.error);

};