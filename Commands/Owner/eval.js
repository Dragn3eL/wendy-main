/**Use the command at your own risk!
 *We will not be responsible for the the negative outcomes, if anything wrong happens!*/
const { MessageEmbed } = require("discord.js");
const OWNER_ID = require("../../config.json").OWNER_ID;
module.exports = {
  name: "eval",
  description: "Run a whole fuckin' code with this!",
  botPerms: ["EMBED_LINKS"],
  run: async (client, message, args) => {
    //Eval Command(Not to be made public btw!)
    if (message.author.id != OWNER_ID) return  
    try {
      const code = args.join(" ");
      if (!code) {
        return message.channel.send("What do you want to evaluate?");
      }
      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      let embed = new MessageEmbed()
        .setAuthor("Eval", message.author.avatarURL())
        .addField("Input", `\`\`\`${code}\`\`\``)
        .addField("Output", `\`\`\`${evaled}\`\`\``)
        .setColor("GREEN");

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      message.channel.send(`\`OOPSIE\` \`\`\`yml\n${err}\n\`\`\``);
    }
  },
};
