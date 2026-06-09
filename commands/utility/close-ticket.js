const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('close-ticket').setDescription('Closes a ticket!'),
    async execute(interaction){
        if(!interaction.channel.name.startsWith('ticket-') && !interaction.member.permission.has('Administrator')){
            return interaction.reply({
                content: 'This is not a ticket channel.',
                ephemeral: true
            });
        }
        await interaction.channel.delete();
    }
}