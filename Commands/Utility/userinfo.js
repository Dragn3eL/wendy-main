const Discord = module.require("discord.js");
const moment = require("moment");

module.exports = {
    name: "userinfo",
    description: "Get info about your discord details or of  mentioned user's!",
    aliases: ["ui"],
    run: async (client, message, args) => {
        const permissions = {
            "ADMINISTRATOR": "Administrator",
            "MANAGE_GUILD": "Manage Server",
            "MANAGE_ROLES": "Manage Roles",
            "MANAGE_CHANNELS": "Manage Channels",
            "KICK_MEMBERS": "Kick Members",
            "BAN_MEMBERS": "Ban Members",
            "MANAGE_NICKNAMES": "Manage Nicknames",
            "MANAGE_EMOJIS": "Manage Emojis",
            "MANAGE_WEBHOOKS": "Manage Webhooks",
            "MANAGE_MESSAGES": "Manage Messages",
            "MENTION_EVERYONE": "Mention Everyone"
        }
        const mention = message.mentions.members.first() || message.member;
        const nick = mention.nickname === null ? "None" : mention.nickname;
        const roles = mention.roles.cache.get === "" ? "None" : mention.roles.cache.get;
        const usericon = mention.user.avatarURL;
        const mentionPermissions = mention.permissions.toArray() === null ? "None" : mention.permissions.toArray();
        const finalPermissions = [];
        for (const permission in permissions) {
            if (mentionPermissions.includes(permission)) finalPermissions.push(`${permissions[permission]}`);
            else;
        }
        var flags = {
            "": "None",
            "DISCORD_EMPLOYEE": "Discord Employee",
            "DISCORD_PARTNER": "Discord Partner",
            "BUGHUNTER_LEVEL_1": "Bug Hunter (Level 1)",
            "BUGHUNTER_LEVEL_2": "Bug Hunter (Level 2)",
            "HYPESQUAD_EVENTS": "Hypesquad Events",
            "HOUSE_BRILLIANCE": "HypeSquad Brilliance",
            "HOUSE_BRAVERY": "HypeSquad Bravery",
            "HOUSE_BALANCE": "HypeSquad Balance",
            "EARLY_SUPPORTER": "Early Supporter",
            "TEAM_USER": "Team User",
            "VERIFIED_BOT": "Verified Bot",
            "EARLY_VERIFIED_DEVELOPER": "Early Verified Bot Developer"
        };
        var bot = {
            "true": "Yes, Bot liek me",
            "false": "No, a Human mhmm"
        };
        const userlol = new Discord.MessageEmbed()
        .setAuthor(`${mention.user.username}'s Info`, mention.user.avatarURL())
        .setThumbnail(usericon)
        .addField(`General Info`, ` ${mention.user.toString()} \n Username: \`${mention.user.tag}\` \nNickname: \`${nick}\``,true)
        .addField(`Overview`, `Badges: \`${flags[mention.user.flags.toArray().join(", ")]}\`\nIs Bot: \`${bot[mention.user.bot]}\``,true)
        .addField(`Server Relating Info`, `\n**Roles:**  <@&${mention._roles.join(">  <@&")}> \n\n**Key Permissions:** \`${finalPermissions.join(', ')}\``)
        .addField( `Acc Created on:`,` \`${moment(mention.user.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\``,true)
        .addField(`Joined Server on:`, `\`${moment(mention.joinedAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\``,true)
        .setThumbnail(mention.user.avatarURL())
        .setFooter(`ID: ${mention.user.id}`, mention.user.avatarURL())
        .setTimestamp()
        .setColor("RANDOM");
        message.channel.send({ embeds: [userlol] })
    }
}
