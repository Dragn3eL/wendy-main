const Discord = module.require("discord.js");

module.exports = {
  name: "report",
  description: "Report a bug",
  botPerms: ["EMBED_LINKS"],
  run: async (client, message, args) => {
    const reportchannel = client.channels.cache.get("852915269784305715");
    const report = args.join(" ");
    if (!report) {
      return message.channel.send(
        "Enter the Description of the bug you encountered!"
      );
    }
    message.channel.send(
      `${message.author}, Your Report has been Successfully Submitted. Our Mod Team will reply to you as soon as possible`
    );
    const embed = new Discord.MessageEmbed()
      .setTitle("New Bug Report")
      .setDescription(`${report} \n\nBy: ${message.author.tag}`)
      .setFooter(`User ID: ${message.author.id}`)
      .setColor("#ff2d3f");

    reportchannel.send({embeds: [embed]});
  },
  catch(error) {
    const errorlogs = client.channels.cache.get("747750993583669258");
    message.channel.send(
      "Looks Like an Error has Ocurred. The Error has been reported to the Report Section!"
    );
    errorlogs.send("Error on Report Command \nError: \n" + error);
  },
};
