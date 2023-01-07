const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("exit")
        .setDescription("Kicka botten från vc"),
	execute: async ({ client, interaction }) => {
		await interaction.deferReply();

		const queue = client.player.getQueue(interaction.guildId)

		if (!queue)
		{
			await interaction.editReply("Det finns inga låtar i kön kompis")
			return;
		}

		queue.destroy();

        await interaction.editReply("Lägger almagd snabbt. Brb")
	},
}