const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const Manager = new Discord.ShardingManager('./index.js');
const OWNER_ID = require("../../config.json").OWNER_ID;
module.exports = {
  name: "name",
  description: "description",
  aliases: [],
  botPerms: [],
  userPerms: [],
  expectedArgs: null,
  minArgs: 1,
  maxArgs: 2,
  ownerOnly: true,
  guildOnly: true,
  enabled: true,
  nsfw: false,
  userPermError: null,
  botPermError: null,
  run: async (client, message, args) => {
    //code



     if (message.author.id != OWNER_ID) {
      return message.channel.send("Limited to the bot owner only!");
    }
    try {

const Discord = require('discord.js');
const Manager = new Discord.ShardingManager('./index.js');

Manager.spawn(3);
//Manager.on('launch', shard => console.log(`- Spawned shard ${shard.id} -`));

    }catch(error) {
    const errorlogs = client.channels.cache.get("903673039668007034");
    message.channel.send(
      "Looks like an error has occured. The error has been reported to the Report Section"
    );
    errorlogs.send(`Error in Suggest Command! \nError: \n` + error);
  }
  }
};