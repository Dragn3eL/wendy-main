const Discord = module.require("discord.js");

module.exports = {
  name: "wikipedia",
  description: "Get Search Results from Wikipedia",
  botPerms: ["EMBED_LINKS"],
  aliases:["wiki"],
  run: async (client, message, args) => {
    const search = args.join("_");
    const msg = args.join(" ");
    if (!msg) {
      return message.channel.send("You need to enter some text to search for");
    }
    const link = `https://www.wikipedia.org/w/index.php?search=${search}&ns0=1`;
    const embed = new Discord.MessageEmbed()
      .setTitle("Wikipedia Search")
      .addField(`Query for:`, `${msg}`)
      .addField(`Results:`, `[My search results](${link})`)
      .setColor("RANDOM");

    message.channel.send({ embeds: [embed] });
  },
};
