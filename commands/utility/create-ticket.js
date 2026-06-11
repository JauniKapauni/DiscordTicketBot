const { SlashCommandBuilder, ChannelType, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { categoryId } = require('../../config.json');
const db = require('../../database');

module.exports = {
    data: new SlashCommandBuilder().setName('create-ticket').setDescription('Creates a ticket!'),
    async execute(interaction){
        db.get('SELECT channelId FROM tickets WHERE userId = ?', [interaction.user.id], async (err, row) => {
            if(err){
                console.error(err);
                return interaction.reply({
                    content: 'Database error',
                    ephemeral: true
                });
            }
            if(row){
                return interaction.reply({
                    content: `You already have a ticket <#${row.channelId}>`,
                    ephemeral: true
                });
            }
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
            db.run('INSERT INTO tickets (userId, channelId) VALUES (?, ?)', [interaction.user.id, channel.id]);
            const closeButton = new ButtonBuilder().setCustomId('close-ticket').setLabel('Close Ticket').setStyle(ButtonStyle.Danger);
            const actionRow = new ActionRowBuilder().addComponents(closeButton);
            await channel.send({
                content: `${interaction.user}, welcome to ur ticket!`,
                components: [actionRow]
            })
            await interaction.reply({
                content: `Ticket created: ${channel}`,
                ephemeral: true
            });
        }
        );
    }
};