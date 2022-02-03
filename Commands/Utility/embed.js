const discord = module.require("discord.js");

module.exports = {
    name: "embed",
    description: "send embed messages using json  file",
    aliases: [ "em"],
    botPerms:["EMBED_LINKS", "MANAGE_MESSAGES"],
    userPerms: ["ADMINISTRATOR"],
   // usage:``,
    cooldown:`1m`,
    
    
    botPermError: null,
    run: async (client, message, args,text) => {
        const json = JSON.parse(text)
         const embed = new  discord.MessageEmbed(json)
         
         return embed
      



    },
  };