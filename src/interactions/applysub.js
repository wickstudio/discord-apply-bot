const { Client, EmbedBuilder, ModalSubmitInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'applysub',
    /**
     * @param {ModalSubmitInteraction} interaction 
     * @param {Client} client 
    */
    async execute(client, config, interaction) {
        const [, type, name] = interaction.customId.split("_");
        const channelID = config.APPLY[type].DATA.find((i) => i.name == name)?.CHANNEL;
        const channel = interaction.guild.channels.cache.get(channelID);

        if (!channel) return;

        // Extracting data from the interaction
        const nameInput = interaction.fields.getTextInputValue('nameInput');
        const ageInput = interaction.fields.getTextInputValue('ageInput');
        const experienceInput = interaction.fields.getTextInputValue('experienceInput');
        const reasonInput = interaction.fields.getTextInputValue('reasonInput');

        // Using the extracted data to populate the embed
        const embed = new EmbedBuilder()
            .setTitle('تفاصيل التقديم')
            .setColor('#ffcc00')
            .setThumbnail(interaction.user.avatarURL())
            .addFields(
                { name: 'المتقدم', value: `<@${interaction.user.id}>` },
                { name: 'الاسم', value: `\`\`\`\n${nameInput}\`\`\`` },
                { name: 'العمر', value: `\`\`\`\n${ageInput}\`\`\`` },
                { name: 'الخبرات', value: `\`\`\`\n${experienceInput}\`\`\`` },
                { name: 'سبب التقديم', value: `\`\`\`\n${reasonInput}\`\`\`` }
            );

        const acceptButton = new ButtonBuilder()
            .setCustomId(`button*_accept_${type}_${name}_${interaction.user.id}`)
            .setLabel('قبول')
            .setEmoji('✔️')
            .setStyle(ButtonStyle.Success);


        const rejectButton = new ButtonBuilder()
            .setCustomId(`button*_reject_${type}_${name}_${interaction.user.id}`)
            .setLabel('رفض')
            .setEmoji('✖️')
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder()
            .addComponents(acceptButton, rejectButton);

        const message = await channel.send({ content: 'إليك تفاصيل التقديم:', embeds: [embed], components: [row] });

        interaction.reply({ content: 'تم إرسال تقديمك بنجاح', ephemeral: true });
    },
};
