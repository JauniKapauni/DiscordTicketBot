const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('create-ticket').setDescription('Creates a ticket!'),
    async execute(interaction){
        const channel = await interaction.guild.channels.create({
            name: `ticket-${interaction.user.username}`,
            type: ChannelType.GuildText
        });
        await interaction.reply({
            content: `Ticket created: ${channel}`,
            ephemeral: true
        });
    }
};