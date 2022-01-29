const OWNER_ID = require("../../config.json").OWNER_ID;
module.exports = {
  name: "shutdown",
  description: "Shut's down the bot",
  ownerOnly:true,
  run: async (client, message, args) => {
    if (message.author.id != OWNER_ID) return 
    try{
    message.channel.send("Shutting down...").then((m) => {
      client.destroy();
    });
    await message.channel.send({embeds:[{description:"**Wendy is now asleep**",color:0x29cddc,timestamp:new Date(),footer:{text:`Good  night ZB`,icon_url:`${client.user.displayAvatarURL()}`},thumbnail:{url:`https://cdn.discordapp.com/attachments/852915269784305715/928689967876702218/unknown.png`}}]});
    console.log(`the bot is shutdown`)
  }catch(err){
    message.channel.send({embeds:[{description:`\`OOPSIE\` \`\`\`yml\n${err}\n\`\`\``}]})
  }
  },
};
