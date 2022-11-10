const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Tömmer kön"),
	execute: async ({ client, interaction }) => {

		const queue = client.player.getQueue(interaction.guildId)

		if (!queue)
		{
			await interaction.reply("Det finns inga låtar i kön kompis")
			return;
		}

		queue.clear();

        await interaction.reply("Nu är kön tom :)")
	},
}