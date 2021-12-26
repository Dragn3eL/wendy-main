


require("dotenv").config({ path: "src/.env" });

const fs = require("fs");
const chalk = require("chalk");

const { Client, Collection, Intents, MessageEmbed } = require("discord.js");
const moment = require('moment');
const { DEFAULT_PREFIX, BOT_TOKEN, ERROR_LOGS_CHANNEL, ALEXFLIPNOTE_API_KEY, YT_COOKIE } = require("./config.json");
const { loadCommands } = require("./handler/loadCommands");
const { loadEvents } = require("./handler/loadEvents");
const { loadSlashCommands } = require("./handler/loadSlashCommands")
const { loadPlayerEvents } = require("./handler/loadPlayerEvents");
const { DiscordTogether } = require('discord-together')
const { Player } = require('discord-player')
const Enmap = require("enmap")

const client = new Client({
  allowedMentions: { parse: ["users", "roles"] },
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
});
const { checkValid } = require("./functions/validation/checkValid")
const Embeds = require("./functions/embeds/Embeds")
const Logger = require("./functions/Logger/Logger")
const Util = require("./functions/util/Util")

const alexClient = require("alexflipnote.js")
client.images = new alexClient(ALEXFLIPNOTE_API_KEY)
client.discordTogether = new DiscordTogether(client);
client.commands = new Collection();
client.slash = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./Commands/");
client.setMaxListeners(0);
const Cookie = YT_COOKIE;
client.logger = Logger;
client.utils = Util;
client.say = Embeds;
client.player = new Player(client, {
  leaveOnEnd: false,
  leaveOnStop: false,
  leaveOnEmpty: false,
  leaveOnEmptyCooldown: 60000,
  bufferingTimeout: 1000,
  autoSelfDeaf: true,
  disableVolume: false,
  //initialVolume: 90,
  ytdlOptions: {
    requestOptions: {
      headers: {
        cookie: Cookie
      }
    }
  },
})

/*
VISITOR_INFO1_LIVE=2lRAk2b1NPM;
 PREF=tz=Asia.Kolkata&f6=40000000; 
 NID=511=GHXgHwbbjWmjKsNZ2hPfXsHqTXKq-MX08BTzYqx2Ymfio58T3C8HWyA1HfO4myaIancDIe4eKxylq6VhEKUp02Hn94l_sb_jepfIIESPTIaEN_zRG_95j2GEMZsJ75EBMye7v65s8cAD4tNDPCT95GopJ3zd17ojshc8FT5JI24;
  __Secure-3PSID=EwhmCQmsWO5niFK3WzZh7B-o3lC4wTO94gUdvf2pB2QfECP6jzmDPeSQSJJ1p5ZhxsECZw.;
   __Secure-3PAPISID=TqvHSnPJxKo5oEdA/ASozHUe6j7bV7Xv02; 
   __Secure-3PSIDCC=AJi4QfG6SXCYNCd9fvFVaEGoGSavgOVmlozypxvZ0p467_mgs3vKIIshDYzbet9KPrch09UR1qs; wide=0; 
   GPS=1; YSC=A8mBHnZ3mx…c; SAPISID=TqvHSnPJxKo5oEdA/ASozHUe6j7bV7Xv02; __Secure-1PAPISID=TqvHSnPJxKo5oEdA/ASozHUe6j7bV7Xv02;
    LOGIN_INFO=AFmmF2swRQIgEJX56mt-I9ZIvd5Q9CrxaXQgl1mmo9XSOEz-r5mg4akCIQDpH8kuaAu63wfUDXR6lx8KMYZS1PmA0Rt2-03MfYLI_Q:QUQ3MjNmdzZqNWpyWjlSNkNnU21xbUROVnFsS1hFVXdFUTVWSjFrY25JN1YxTEN3c3M1ZkgxZ3ZOODZ1LWNIYmFtaU82eGVoQUNWbkZLZnBkZG5YWDlhNEhuWXhmTEpOemxwOGVfalNsSXVPcFRMOHA5YnRXSC1VM2pXQ1plS0NkdE5pWXlZaE1rcTlma2dpT2FKY0lxdVpROS1TM3I5YnlB; SIDCC=AJi4QfGRPiI5Q53rp1S_rK47jJYSpcXBaRO5jIaYnSVDGJONNjAmD5dkSIgUkSGbrtoAvoTp



*/








client.player.use("YOUTUBE_DL", require("@discord-player/downloader").Downloader);
client.db = new Enmap({ name: "musicdb" });

loadCommands(client);
loadEvents(client);
loadPlayerEvents(client);
loadSlashCommands(client);
checkValid();

// Error Handling

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception: " + err);

  const exceptionembed = new MessageEmbed()
  .setTitle("Uncaught Exception")
  .setDescription(`${err}`)
  .setColor("RED")
  client.channels.cache.get(ERROR_LOGS_CHANNEL).send({ embeds: [exceptionembed] })
});

process.on("unhandledRejection", (reason, promise) => {
  console.log(
    "[FATAL] Possibly Unhandled Rejection at: Promise ",
    promise,
    " reason: ",
    reason.message
  );

   const rejectionembed = new MessageEmbed()
  .setTitle("Unhandled Promise Rejection")
  .addField("Promise", `${promise}`)
  .addField("Reason", `${reason.message}`)
  .setColor("RED")
  client.channels.cache.get(ERROR_LOGS_CHANNEL).send({ embeds: [rejectionembed] })
});

client.login(BOT_TOKEN).then(() => {
  console.log(
    chalk.bgBlueBright.black(
      ` Successfully logged in as: ${client.user.username}#${client.user.discriminator} `
    )
  );
});


// client.on('ready', () => {
//     if (client.shard.id == 0)
//         console.log(`-- ${moment().utc().format('MMMM Do')}, ${moment().utc().format('hh:mm a')} --`);

//     console.log(`Shard ${client.shard.id} ready!`);
// });
