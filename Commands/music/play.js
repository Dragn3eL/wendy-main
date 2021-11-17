const { player } = require("discord-player");
const {client,message} = require ('discord.js')
const {QueryType} = require('discord-player')
const {MessageEmbed} = require("discord.js")

module.exports = {
    name: "play",
    aliases: ["p"],
    category: "Music",
    usage: "p",
    description: "play a requested song!",
    ownerOnly: false,
    nsfwOnly: false,
    run: async (client, message, args,player) => {
   

  let voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply(`You Need to Join Voice Channel`);

    let search_Song = args.join(" ");
    if (!search_Song) return message.reply(`Type Song name or Link`);

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

    if (!song || !song.tracks.length) return message.reply(` I cant Find \`${search_Song}\` `);

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