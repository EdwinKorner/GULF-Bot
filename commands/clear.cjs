const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Tömmer kön"),
	execute: async ({ client, interaction }) => {
		await interaction.deferReply();
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue)
		{
			await interaction.editReply("Det finns inga låtar i kön kompis")
			return;
		}

		queue.clear();

        await interaction.editReply("Nu är kön tom :)")
	},
}