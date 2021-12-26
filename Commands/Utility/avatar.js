const discord = module.require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ["av"],
  category: "Utility",
  usage: "avatar/avatar @user",
  description: "Gives avatar for message author or mentioned user.",
  botPerms: ["EMBED_LINKS", "MANAGE_MESSAGES"],
  run: async (client, message, args) => {
    let user = message.mentions.users.first() || message.author;
    let embed = new discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(`${user.username}'s Avatar`,client.user.displayAvatarURL())
      .setDescription(
        `[Avatar.png](${user.displayAvatarURL({
          size: 1024,
          dynamic: true,
          format: "png",
        })}) | [Avatar.jpg](${user.displayAvatarURL({
          size: 1024,
          dynamic: true,
          format: "jpg",
        })}) | [Avatar.gif](${user.displayAvatarURL({
          size: 1024,
          dynamic: true,
          format: "gif",
        })})`
      )
      .setFooter(`Nice pic | UwU`)
      .setTimestamp()
      .setImage(user.avatarURL({ size: 1024, dynamic: true, format: "png" }));
     

    message.channel.send({ embeds: [embed] });
    message.delete();
  },
};
