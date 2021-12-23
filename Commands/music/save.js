const { player } = require("discord-player");
const {client,message} = require ('discord.js')
const {QueryType} = require('discord-player')
const {MessageEmbed} = require("discord.js")
const { DEFAULT_PREFIX } = require("../../config.json")

module.exports = {
    name: "save",
    aliases: ["sv"],
    category: "Music",
    usage: `${DEFAULT_PREFIX}save`,
    description: "save a song in bot dm!",
    ownerOnly: true,
    enabled:false,
    nsfwOnly: false,
  //  voiceChannel:true,
    run: async (client, message, args,player) => {
        
   
    }}