const { version } = require("discord.js");
const pms = require('pretty-ms');
const moment = require("moment");
require("moment-duration-format");
const Discord = require("discord.js");
let os = require("os");
let cpuStat = require("cpu-stat");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
let js = "discord.js"

module.exports = {
  name: "stats",
  descriptiom: "Get Inifnity's Stats",
  botPerms: ["EMBED_LINKS"],
  run: async (client, message, args, level) => {
    // eslint-disable-line no-unused-vars
    try {
      const cmdFiles = await readdir("./Commands/");
      let cpuLol;
      cpuStat.usagePercent(function (err, percent, seconds) {
        if (err) {
          return console.log(err);
        }
        const duration = moment
          .duration(client.uptime)
          .format(" D [days], H [hrs], m [mins], s [secs]");
        let bicon = client.user.displayAvatarURL;
        const RynEmb = new Discord.MessageEmbed()
          .setAuthor(client.user.username, client.user.displayAvatarURL)
          .setDescription("Wendy Stats:")
          .setTimestamp()
          .setThumbnail(bicon)
          .setColor("RANDOM")
          .setFooter(
            `Requested by ${message.author.username}#${message.author.discriminator}`,
            message.author.displayAvatarURL
          )
          .addField("System Stats", `\`\`\`yml\nMemory usage : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(
            os.totalmem() /
            1024 /
            1024
          ).toFixed(2)} MB \nCPU usage : ${percent.toFixed(2)}%\nCPU : ${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``,true)
          
          
          
          
         
          //.addField(":minidisc: ", `\`${percent.toFixed(2)}%\``, true)
          // .addField(
          //   "CPU",
          //   `\`\`\`md\n\`\`\``,
          //   true
          // )
          //.addField(":computer: System", `\`${os.arch()}\``, true)
         // .addField(":desktop: Platform", `\`\`${os.platform()}\`\``, true)
         .addField(`Bot Stats`, `\`\`\`yml\nUsers : ${client.users.cache.size} \nHomes : ${client.guilds.cache.size}\nChannels : ${client.channels.cache.size}\`\`\``,true)
          
      //    .addField("Commands Count", "``11``", true)
         .addField("<:bookshelf:908966883070447646> Library", `\`\`\`yml\nLibrary: ${js} \nNode.js: ${process.version}\nDiscord.js: v${version}\`\`\``, true)
        
          
          .addField("OF me ", `\`\`\`yml\nBorn in: ${client.user.createdAt} \nPing: ${Math.round(client.ws.ping)}\nUptime: ${duration}\`\`\``, true)
          
        message.channel.send({ embeds: [RynEmb] });
      });
    } catch (err) {
      const errorlogs = client.channels.cache.get("747750993583669258");
      message.channel.send(
        `Whoops, We got a error right now! This error has been reported to Support center!`
      );
      errorlogs.send(`Error on stats commands!\n\nError:\n\n ${err}`);
    }
  }
  }
