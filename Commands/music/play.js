const { player } = require("discord-player");
const {client,message} = require ('discord.js')
const {QueryType} = require('discord-player')
const {MessageEmbed} = require("discord.js")
const { DEFAULT_PREFIX } = require("../../config.json")

module.exports = {
    name: "play",
    aliases: ["p"],
    category: "Music",
    usage: `${DEFAULT_PREFIX}p <Title/song url>`,
    description: "play a requested song!",
    ownerOnly: false,
    nsfwOnly: false,
  //  voiceChannel:true,
    run: async (client, message, args,player) => {
      let voiceChannel = message.member.voice.channel;
      if (!voiceChannel) return message.reply({embeds:[{description: `**Join in a voice channel first where i have access <3**`, color:0xe33e4a,timestamp: new Date()}]});

     



      const gqueue = client.player.getQueue(message.guild.id);

      const channel = message.member?.voice?.channel;

      if (gqueue && channel.id !== message.guild.me.voice.channel.id)
      return message.reply({embeds:[{description: `**I am already playing somewhere in the server |disconnect me from there to play**`, color:0xe33e4a,timestamp: new Date()}]});
    
      if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({embeds: [{description:`Be in the same \`vc\` i connect to!`,color:0xe33e4a,timestamp: new Date()}]})
  
      let search_Song = args.join(" ");
      if (!search_Song) return message.reply({embeds:[{description: `**Please indicate the title of  the song you want me to play **`, color:0xe33e4a,timestamp: new Date()}]})
      //(`Type Song name or Link`);
      
  
      let queue = client.player.createQueue(message.guild.id, {
  
        ytdlOptions: {
              quality: "highest",
              filter: "audioonly",
              highWaterMark: 1 << 25,
              dlChunkSize: 0
          },
        metadata: {
          channel: message.channel,
          searchEngine: QueryType.AUTO
        },
      });
  
      // verify vc connection
      try {
        if (!queue.connection) await queue.connect(voiceChannel);
      } catch {
        client.player.deleteQueue(message.guild.id)
        queue.destroy()
        return await message.reply({
          content: "Could not join your voice channel!",
          ephemeral: true,
        });
      }
  
      let song = await client.player
        .search(search_Song, {
          requestedBy: message.author,
        })
        song.playlist ? queue.addTracks(song.tracks) : queue.addTrack(song.tracks[0]);
  
      if (!song || !song.tracks.length) return message.reply({embeds:[{description: ` I cant find anything for \`${search_Song}\``, color:0xe33e4a,timestamp: new Date()}]})

  
      if (!queue.playing) await queue.play();
  
      let songembed = new MessageEmbed()
   .setColor('#29CDDC')
          .setFooter(client.user.username + " | UwU ",client.user.displayAvatarURL())
          .setTitle(' 🔍 Searching....')
          .setDescription(`\`\`\`diff\n+${args.join(" ")}\n\`\`\``)
          .setThumbnail(message.author.displayAvatarURL())
  
  
      await  message.channel.send({ embeds: [songembed] }).then(msg => {
      message.delete()
      setTimeout(() => msg.delete(), 2000)
    })
    .catch()

   // message.channel.send({ content: ` }); 
   
   

   
 } }