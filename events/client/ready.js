const chalk = require("chalk");
const mongoose = require("mongoose");

const { mongoPass } = require("../../config.json"); 
var os = require('os-utils');
module.exports = (client) => {
 client.user.setPresence({ status: "idle" });

const activities = [
      `${client.guilds.cache.size} Homes`,
      `${client.users.cache.size} awsome people`,
      `on update validation`,
      `CPU : ${os.cpuCount()}`

]
 let i =0;
 setInterval(() => client.user.setActivity(`1 days to go | ${activities[i++ % activities.length]}`, {type: 'PLAYING'}),  15000)





  let allMembers = new Set();
  client.guilds.cache.forEach((guild) => {
    guild.members.cache.forEach((member) => {
      allMembers.add(member.user.id);
    });
  });

  let allChannels = new Set();
  client.guilds.cache.forEach((guild) => {
    guild.channels.cache.forEach((channel) => {
      allChannels.add(channel.id);
    });
  });

  console.log(
    chalk.bgMagentaBright.black(` ${client.guilds.cache.size} servers `),
    chalk.bgMagentaBright.black(` ${client.channels.cache.size} channels `),
    chalk.bgMagentaBright.black(` ${allMembers.size} members `)
  );

  mongoose
    .connect(mongoPass, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(
      console.log(
        chalk.bgGreenBright.black(
          ` ${client.user.username} connected to Mongo DB `
        )
      )
    )
    .catch((err) =>
      console.log(
        chalk.bgRedBright.black(
          ` ${client.user.username} could not connect to mongo DB `
        )
      )
    );
};
