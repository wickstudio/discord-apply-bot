const { Client, EmbedBuilder, ButtonInteraction, GuildMember } = require('discord.js');

module.exports = {
    name: 'button',
    /**
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
    */
    async execute(client, config, interaction) {
        const [, type, field, name, userId] = interaction.customId.split("_");

        if (type === 'accept') {
            try {
                interaction.message.edit({ content: ' ', embeds: [new EmbedBuilder(interaction.message.embeds[0]).addFields({ name: '**تم قبوله بواسطة**', value: `<@${interaction.user.id}>` })], components: [] });
                const user = await client.users.fetch(userId);
                await user.send(` تم قبولك في التقديم في  ${config.APPLY[field].NAME} في ${name}`);
            } catch (error) {
                console.error('Failed to send acceptance message:', error);
                // Handle error if the message fails to send to the user
            } finally {
                const roleID = config.APPLY[field].DATA.find((i) => i.name === name)?.role;

                if (roleID) {
                    try {
                        const guildUser = await interaction.guild.members.fetch(userId);
                        await guildUser.roles.add(roleID);
                    } catch (error) {
                        console.error('Failed to add role to user:', error);
                        // Handle error if the role addition fails
                    }
                } else {
                    console.error('Role ID not found');
                    // Handle case where role ID is not found
                }
            }
            interaction.reply({ content: 'تم القبول بنجاح', ephemeral: true })
        } else {
            // Send rejection message to the user
            try {
                interaction.message.edit({ content: ' ', embeds: [new EmbedBuilder(interaction.message.embeds[0]).addFields({ name: '**تم رفضه بواسطة**', value: `<@${interaction.user.id}>` })], components: [] })
                const user = await client.users.fetch(userId);

                await user.send(` تم رفضك في التقديم في  ${config.APPLY[field].NAME} في ${name}`);
            } catch (error) {
                console.error('Failed to send rejection message:', error);
                // Handle error if the rejection message fails to send
            }
            interaction.reply({ content: 'تم الرفض بنجاح', ephemeral: true })
        }
    },
};
