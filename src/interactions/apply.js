const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, Client, StringSelectMenuInteraction, TextInputBuilder, TextInputStyle, StringSelectMenuBuilder } = require('discord.js');
const data = require('../../config.json')
module.exports = {
    name: 'apply',
    /**
     * @param {StringSelectMenuInteraction}  interaction 
     * @param {Client} client 
    */
    async execute(client, config, interaction) {
        const option = interaction.values[0]
        const modal = new ModalBuilder()
            .setCustomId(`applysub*_${interaction.customId.split('*')[1]}_${option}`)
            .setTitle(`تقديم على ${option}`);

        // Create text input components
        const nameInput = new TextInputBuilder()
            .setCustomId('nameInput')
            .setLabel('الاسم')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('ادخل الاسم هنا')
            .setRequired(true);

        const ageInput = new TextInputBuilder()
            .setCustomId('ageInput')
            .setLabel('العمر')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('ادخل العمر هنا')
            .setRequired(true);

        const experienceInput = new TextInputBuilder()
            .setCustomId('experienceInput')
            .setLabel('الخبرات')
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder('ادخل الخبرات هنا')
            .setRequired(true);

        const reasonInput = new TextInputBuilder()
            .setCustomId('reasonInput')
            .setLabel('سبب التقديم')
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder('ادخل سبب التقديم هنا')
            .setRequired(true);

        // Create action rows for each text input
        const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
        const secondActionRow = new ActionRowBuilder().addComponents(ageInput);
        const thirdActionRow = new ActionRowBuilder().addComponents(experienceInput);
        const fourthActionRow = new ActionRowBuilder().addComponents(reasonInput);

        // Add inputs to the modal
        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);

        interaction.showModal(modal);
    },

};

