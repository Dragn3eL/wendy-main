const discord = require("discord.js");
const time = require ("ms");
 

module.exports = {
    name: "uptime",
    aliases: ["up"],
    category: "info",
    usage: "w!uptime",
    description: "Get the bot's online duration!",
   // ownerOnly: false,
    nsfwOnly: false,
    run: async (client, message, args) => {
        const uptime = time(client.uptime)
        message.reply({embeds:[new discord.MessageEmbed().setColor("#29cddc").setTitle(`${client.user.username} Uptime`).setDescription(`${time(client.uptime)}`)  
     ]})
    
    
    
    
    
    
    
    
    
    
    
    }
}