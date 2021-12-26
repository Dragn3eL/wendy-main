const Discord = module.require("discord.js");
const OWNER_ID = require("../../config.json").OWNER_ID;

module.exports = {
  name: "emojiid",
  description: "Get ID of emojis",
  run: async (client, message, args) => {


    if (message.author.id != OWNER_ID) {
      return 
    }try {
  const name = args.join(" ");
    const emoji = message.guild.emojis.cache.find((r) => r.name === name);
    if (!name) {
      return message.channel.send("Please type the emoji name");
    }
    if (!emoji) {
      return message.channel.send(
        "Couldn't find the Emojis with the provided name. Please make sure the Emoji name is correct"
      );
    }
    new message.channel.send(`\`\`\`${emoji}\`\`\``);
    }catch(error) {
    const errorlogs = client.channels.cache.get("903673039668007034")
   
    
    errorlogs.send(`Error in emojiid! \nError: \n` + error);
  }
  }
};
