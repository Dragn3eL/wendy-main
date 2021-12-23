const { player } = require("discord-player");
const {client,message} = require ('discord.js')
const {QueryType} = require('discord-player')
const {MessageEmbed} = require("discord.js")
const { DEFAULT_PREFIX } = require("../../config.json")

module.exports = {
    name: "resume",
    aliases: ["res"],
    category: "Music",
    usage: `${DEFAULT_PREFIX}resume`,
    description: "resume a paused song!",
    ownerOnly: false,
    nsfwOnly: false,
   // voiceChannel:true,
    run: async (client, message, args,player) => {
        const queue = client.player.getQueue(message.guild);
        if (!queue || !queue.playing) return;
        const paused = queue.setPaused(false);
		return paused ? message.react('▶️') : message.react('❌');
    
    }}