const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pauses the current song"),
	execute: async ({ client, interaction }) => {
    
		const queue = client.player.getQueue(interaction.guildId)

        // Check if the queue is empty
		if (!queue)
		{
			await interaction.reply("Varför vill du pausa när jag inte spelar något? Din dumme fan")
			return;
		}

        // Pause the current song
		queue.setPaused(true);

        await interaction.reply("Botfanskapet är pausad")
	},
}