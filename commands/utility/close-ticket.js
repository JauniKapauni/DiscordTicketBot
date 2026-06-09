const { SlashCommandBuilder } = require('discord.js');
const db = require('../../database');

module.exports = {
    data: new SlashCommandBuilder().setName('close-ticket').setDescription('Closes a ticket!'),
    async execute(interaction){
        if(!interaction.channel.name.startsWith('ticket-') && !interaction.member.permissions.has('Administrator')){
            return interaction.reply({
                content: 'This is not a ticket channel.',
                ephemeral: true
            });
        }
        db.run('DELETE FROM tickets WHERE channelId = ?', [interaction.channel.id]);
        await interaction.channel.delete();
    }
}