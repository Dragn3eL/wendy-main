const autoroleData = require("../../../database/guildData/djrole")

module.exports = async(interaction, client) => {
    if (!interaction.isSelectMenu()) return;
    let msg = await interaction.channel.messages.fetch(interaction.message.id)
    if (interaction.values[0] === "dj") {

        await interaction.deferUpdate()

        const data = await autoroleData.findOne({
            GuildID: interaction.guild.id
        })

        if (!data) {

            msg.edit('Send the **ROLE ID** for DJrole!')

            const filter = (m) => m.author.id == interaction.message.author.id

            var RoleMsg = await interaction.channel.awaitMessages({ time: 60000, max: 1, errors: ['time'] })
            
            let role = RoleMsg.first().content

                let newData = new autoroleData({
                    Role: role,
                    GuildID: interaction.guild.id
                })
    
                newData.save();
            return msg.edit(`DJRole set to ${interaction.guild.roles.cache.get(role)}`)

        } else if (data) {
            
            await autoroleData.findOneAndRemove({
                GuildID: interaction.guild.id
            })

            return msg.edit(`DJROLE has been disabled\n use w!setdj <@role> or use the dropdown dj to reset it again!`)
        }
    }
}