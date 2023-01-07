const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Skicka hjälp-hemsidan"),
	execute: async ({ client, interaction }) => {
        await interaction.deferReply();

        await interaction.editReply(`**Instruktionssida: ** https://gulfbothelp.netlify.app/`)
	},
}