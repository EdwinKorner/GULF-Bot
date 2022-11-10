const { SlashCommandBuilder } = require("@discordjs/builders")
const {FullRunePage, RandomItems, RandomChamp} = require('../ultimateBraveryData.cjs');





module.exports = {
	data: new SlashCommandBuilder()
        .setName("ub")
        .setDescription("Gör league lite svårare"),
	execute: async ({ client, interaction }) => {

		await interaction.reply(
            "**Champion: **"
            + ('\n') +
            RandomChamp 
            + ('\n') +
            "**Runes: **"
            + ('\n') +
            FullRunePage 
            + ('\n') +
            "**Items: **"
            + ('\n') +
            RandomItems
            );
            return;

	},
}