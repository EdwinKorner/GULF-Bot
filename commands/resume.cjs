const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Börjar spela igen"),
	execute: async ({ client, interaction }) => {
        await interaction.deferReply();
        // Get the queue for the server
		const queue = client.player.getQueue(interaction.guildId)

        // Check if the queue is empty
		if (!queue)
        {
            await interaction.editReply("Kön är extremt tom");
            return;
        }

        // Pause the current song
		queue.setPaused(false);

        await interaction.editReply("Nu jävlar är det dunk")
	},
}