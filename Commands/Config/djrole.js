const arole = require("../../database/guildData/djrole");

module.exports = {
  name: "djrole",
  description: "DJ role setup for extra music  cmds\n special role give manually!",
  permissions: "MANAGE_ROLES",
  botPermissions: "MANAGE_ROLES",
  args: "Yes",
  usage: "!djrole <Role|off>",
  aliases: ["sdj"],
  userPerms: ["MANAGE_ROLES"],
  botPerms: ["MANAGE_ROLES"],
  ownerOnly:true,
  enabled:false,

  run: async (client, message, args) => {
   
    if (!args[0]) {
      return message.channel.send(`\`Usage: ${message.client.prefix}djrole <@role|off>\``)
    }
    if (message.mentions.roles.first()) {
      const data = await arole.findOne({
        GuildID: message.guild.id
      });

      if (data) {
        await arole.findOneAndRemove({
          GuildID: message.guild.id
        });

        message.channel.send(`DJROLE is active and role set to ${message.mentions.roles.first()}`);

        let newData = new arole({
          Role: message.mentions.roles.first().id,
          GuildID: message.guild.id
        });
        newData.save();
      } else if (!data) {
        message.channel.send(`DJROLE is now  set to ${message.mentions.roles.first()}`);

        let newData = new arole({
          Role: message.mentions.roles.first().id,
          GuildID: message.guild.id
        });
        newData.save();
      }
    } else if (args[0] === "off") {
      const data2 = await arole.findOne({
        GuildID: message.guild.id
      });

      if (data2) {
        await arole.findOneAndRemove({
          GuildID: message.guild.id
        });

        return message.channel.send(`DJ MODE  has been turned off!`);

      } else if (!data2) {
        return message.channel.send(`DJ ROLE isn't setup!`)
      }
    }
  }
}