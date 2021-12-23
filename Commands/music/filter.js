const {MessageEmbed} = require("discord.js")
const { DEFAULT_PREFIX } = require("../../config.json")
const { QueueRepeatMode } = require('discord-player');
const { ownerOnly } = require("../Config/djrole");



module.exports = {
    name: "filter",
    description: "View and set audio filters to music",
    category: "Music",
    usage:`${DEFAULT_PREFIX}filter <filter name>`,
    permission: "SEND_MESSAGES",
    aliases: ["fi"],
    voiceChannel:true,
    // ownerOnly:true,
    // enabled:false,
   run :async (client,message, args) => {
    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.channel.send({ embeds: [{description:`**There is no song playing in server, add some !**`, color: 0x29cddc ,timestamp:new Date(),footer:{
        text: `UwU`,
        icon_url: client.user.displayAvatarURL()
    }

    }]});
    



    const actualFilter = queue.getFiltersEnabled()[0];

    if (!args[0]) return message.channel.send({embeds:[{description:`Please specify a valid filter to enable or disable ${message.author}... try again ? ❌\n${actualFilter ? `Filter currently active ${actualFilter} (${DEFAULT_PREFIX}filter ${actualFilter} to disable it).\n` : ''}\n**List of available Filters**`  ,color:0x29cddc,timestamp:new Date() 
,fields:[
    {
        name:'Filters',value:'bassboost_low\nvibrato\nbassboost\nreverse\nbassboost_high\ntreble\n8D\nnormalizer\nvaporwave\nnormalizer2\nnightcore\nsurrounding\nphaser\npulsator\ntremolo\nsubboost',inline:true,
    },
    {
        name:'\u200B',value:'kakaoke\nexpander\nflanger\nsoftlimiter\nhaas\nchorus\nmcompand\nchorus2d\nmono\nchorus3d\nmstlr\nfadein\nmstrr\ndim\ncompressor\nearrape',inline:true,
    }
]



}]})
    //(`Please specify a valid filter to enable or disable ${message.author}... try again ? ❌\n${actualFilter ? `Filter currently active ${actualFilter} (${DEFAULT_PREFIX}filter ${actualFilter} to disable it).\n` : ''}`);

    const filters = [];

    queue.getFiltersEnabled().map(x => filters.push(x));
    queue.getFiltersDisabled().map(x => filters.push(x));

    const filter = filters.find((x) => x.toLowerCase() === args[0].toLowerCase());


    // const filtersStatuses = [[], []];
    // client.filters.forEach((filterName) => {
    //     const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
    //     array.push(filterName.charAt(0).toUpperCase() + filterName.slice(1) + " : " + (client.player.getQueue(message).filters[filterName] ));
    // });

    //if (!filter) return message.channel.send(`This filter doesn't exist ${message.author}... try again ? ❌\n${actualFilter ? `Filter currently active ${actualFilter}.\n` : ''}List of available filters ${filters.map(x => `**${x}**`).join(', ')}.`);
if (!filter) return message.channel.send({embeds:[{description:`**The filter doesn't seem to exist, weird isnt it!**`,color:0x29cddc,timestamp:new  Date(),footer:{
    text:`OwO`,
    icon_url:client.user.displayAvatarURL()
}}]}).then(async(m) =>{
  let editFilter = new MessageEmbed()
  .setColor("#29cddc")
  .setDescription(`\`\`\`yml\nActive Filters:${actualFilter ? ` ${actualFilter} .\n` : ''}\`\`\``)
  .addField(`Filters`,`${filters.map(x => `**${x}**`).join('\n')}`,true)
  .setFooter(`use \`w!filter <filtername>\` to add a Filter`,client.user.displayAvatarURL())

    setTimeout(() => m.edit({embeds:[editFilter]}),2000)
}
)
   

const filtersUpdated = {};

    filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

    await queue.setFilters(filtersUpdated);

    message.channel.send({ embeds:[   {  description:`ara ara   ${filter} **${queue.getFiltersEnabled().includes(filter) ? 'enabled' : 'disabled'}** to our music  ✅\n*It might lag or slow down a bit (◕︿◕✿) Cheap VPS!*`
     } ]});



   }}