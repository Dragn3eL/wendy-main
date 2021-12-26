const {QueryType} = require('discord-player')
const paginationEmbed = require('discordjs-button-pagination');
const { MessageEmbed, MessageButton } = require('discord.js');

const { DEFAULT_PREFIX } = require("../../config.json")

module.exports = {
    name: "queue",
    aliases: ["q"],
    category: "Music",
    usage: `${DEFAULT_PREFIX}queue `,
    description: "Displays the Server's Music Queue",
    ownerOnly: false,
    nsfwOnly: false,
 //   voiceChannel:true,
    run: async (client, message, args,_fromButton = false) => {
        let voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply({embeds:[{description: `**Join in a voice channel first **`, color:0xe33e4a,timestamp: new Date()}]});
  
  
  
        const gqueue = client.player.getQueue(message.guild.id);
  
        const channel = message.member?.voice?.channel;
  
        if (gqueue && channel.id !== message.guild.me.voice.channel.id)
        return message.reply({embeds:[{description: `**I am already playing somewhere in the server |disconnect me from there to play**`, color:0xe33e4a,timestamp: new Date()}]});
      
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({embeds: [{description:`Be in the same \`vc\` i connect to!`,color:0xe33e4a,timestamp: new Date()}]})

        const queue = client.player.getQueue(message.guild);

         if (!queue) {
             if (_fromButton) return;
              const embed = new MessageEmbed().setDescription(` There are no songs in the queue :/,add some !`).setColor('#29cddc').setTimestamp().setFooter(`${queue.guild.name} Queue`, client.user.displayAvatarURL())
              return message.channel.send({embeds:[embed]});
         }

          let usedby;
           if (_fromButton)
           usedby= message.user;
           else 
              usedby= "";


               const buttons = [
                        new MessageButton()
                        .setCustomId('previousbtn')
                        .setLabel("Previous")
                        .setStyle("SECONDARY"),
                        new MessageButton()
                        .setCustomId('nextbtn')
                        .setLabel('Next')
                        .setStyle('SUCCESS')

               ];


                const pages =[];
                 let page =1;
                  let emptypage = false;
                  do {
                      const pageStart = 10* (page-1);
                       const pageEnd = pageStart + 10;
                        const tracks = queue .tracks.slice(pageStart,pageEnd).map((m,i) =>{
                            return `**${i + pageStart + 1}**. [${m.title}](${m.url}) \`${m.duration}\` - ${m.requestedBy}`;
                        });

                         if (tracks.length) {
                             const embed = new MessageEmbed()
                             embed.setTimestamp()
                             embed.setDescription(`${usedby}\n ${tracks.join('\n')} 
                              ${queue.tracks.length > pageEnd ?  `\n.. ${queue.tracks.length - pageEnd} more tracks`:''}`);
                       
                            if (page%2 ===0) embed.setColor('#9bff00');
                            else    embed.setColor(`#29cddc`) 
                             if (page ===1) embed.setAuthor(`Now Playing 🎸 ~ ${queue.current.title}`,null,`${queue.current.url}`);
                              pages.push(embed);
                              page++;               
                       //#9bff00
                       }
                        else {
                              emptypage =1;
                               if (page ===1) {

                                const embed = new MessageEmbed()
                                embed.setColor(`#de4141`)
                                embed.setTimestamp()
                                embed.setDescription(`${usedby}\n No songs in our Queue`);
                                embed.setAuthor(`Now playing 🎸 :~ ${queue.current.title}`,null,`${queue.current.url}`)
                                return message.channel.send({embeds:[embed]})
                            }
                             if (page ===2) {
                                 return message.channel.send({embeds : [pages[0]] });
                             }


                        }
                  }while(!emptypage);
                  return paginationEmbed(message,pages,buttons,30000)
   
   
   
    }
};