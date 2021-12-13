const discord = require("discord.js");
const time = require ("ms");
 

module.exports = {
    name: "ping",
    aliases: ["pong"],
    category: "Utility",
    usage: "ping",
    description: "Get the bot's ping!",
    ownerOnly: false,
    nsfwOnly: false,
    run: async (client, message, args) => {
    
    const uptime = time(client.uptime)
    const errorlogs = client.channels.cache.get("903673039668007034");
     let start = Date.now();

     let pingEmbed = new discord.MessageEmbed()
     .setDescription("Looks like the bot is slow.xD")
     .setColor("#29cddc")
  
  message.channel.send({ embeds: [pingEmbed] }).then(m => {
    
    let end = Date.now();
    
    let embed = new discord.MessageEmbed()
    .setAuthor("Ping Pong!", message.author.avatarURL())
    .addField("<a:KAWAII:747082492770517072> Mah Heart | API ", Math.round(client.ws.ping) + "ms", true)
    .addField("<a:latency:898147640573833269> Latency", end - start + "ms", true)
    .setColor("RANDOM")
    .setFooter(`  UwU |Uptime = ${uptime}`,client.user.displayAvatarURL())
    m.edit({ embeds: [embed] })
    
  }) .catch (e =>  errorlogs.send(`Error in ping Command! \nError: \n` + e)) 
   
    
   


    } 
};
