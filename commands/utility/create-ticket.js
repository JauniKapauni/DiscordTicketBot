const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');
const { categoryId } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder().setName('create-ticket').setDescription('Creates a ticket!'),
    async execute(interaction){
        const channel = await interaction.guild.channels.create({
            name: `ticket-${interaction.user.username}`,
            type: ChannelType.GuildText,
            parent: categoryId,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [PermissionFlagsBits.ViewChannel]
                },
                {
                    id: interaction.user.id,
                    allow: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.SendMessages,
                        PermissionFlagsBits.ReadMessageHistory
                    ]
                }
            ]
        });
        await channel.send({
            content: `${interaction.user}, welcome to ur ticket!`
        })
        await interaction.reply({
            content: `Ticket created: ${channel}`,
            ephemeral: true
        });
    }
};