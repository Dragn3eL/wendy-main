const Discord = require("discord.js");
const malScraper = require('mal-scraper');

module.exports = {
  name: "anime",
  category: "utility",
  description: "Get info about an anime",
  usage: "w!anime <animename>",
  aliases:["animesearch"],
run: async (client, message, args) => {

      if (!message.channel.nsfw) {
        message.react(`❌`);
         return message.reply({embeds:[{description:`Please make sure to set the channel to  **NSFW**`,color:0x29cddc,timestamp:new Date()}]}).then((m) =>{
           setTimeout(() => m.delete(), 4000);
         })
      }

        const search = `${args}`;
        if(!search)
        return message.reply('Enter a valid search query [if invalid no results would come.]');

        malScraper.getInfoFromName(search)
          .then((data) => {
          const malEmbed = new Discord.MessageEmbed()
            .setAuthor(`Looked for ${args} in the vast Anime world`.split(',').join(' '))
            .setThumbnail(data.picture)
            .setColor('#bb34ff') //I personally use bubblegum pink!
            .addField('English Title', data.englishTitle, true)
            .addField('Japanese Title', data.japaneseTitle, true)
            .addField('Type', data.type, true)
            .addField('Episodes', data.episodes, true)
            .addField('Rating', data.rating, true)
            .addField('Aired', data.aired, true)
            .addField('Score', data.score, true)
            .addField('Score Stats', data.scoreStats, true)
            .addField('Link', data.url);

            message.channel.send({ embeds: [malEmbed] });

          })
}
};
