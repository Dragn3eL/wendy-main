const { player } = require("discord-player");
const {client,message} = require ('discord.js')
const {QueryType} = require('discord-player')
const {MessageEmbed} = require("discord.js")
const { DEFAULT_PREFIX } = require("../../config.json")

module.exports = {
    name: "remove",
    aliases: ["rm"],
    category: "Music",
    usage: `${DEFAULT_PREFIX}remove <index no>`,
    description: "Remove a song from the server Queue!",
    ownerOnly: false,
    nsfwOnly: false,
   // voiceChannel:true,
    run: async (client, message, args,player) => {
    
        const queue = client.player.getQueue(message.guild);
        if (!queue || !args[1]) return;
        const trackIndex = args[1] - 1;
        if(!queue.tracks[trackIndex]) return;
        const trackName = queue.tracks[trackIndex].title;
        const trackUrl = queue.tracks[trackIndex].url;
        queue.remove(trackIndex);

        message.channel.send({
            embeds: [
                {
                    description: `Removed [${trackName}](${trackUrl})`,
                    color: 0xda505c
                }
            ]
        });
	}
    
    }