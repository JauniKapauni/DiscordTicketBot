const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('create-panel').setDescription('Creates ticket panel!'),
	async execute(interaction){
		const button = new ButtonBuilder().setCustomId('create-panel').setLabel('Create Ticket').setStyle(ButtonStyle.Success);
		const actionRow = new ActionRowBuilder().addComponents(button);
		await interaction.reply({
			content: 'Open a ticket',
			components: [actionRow]
		})
	}
}