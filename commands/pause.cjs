const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pausar låten som spelas"),
	execute: async ({ client, interaction }) => {
		await interaction.deferReply();
    
		const queue = client.player.getQueue(interaction.guildId)

        // Check if the queue is empty
		if (!queue)
		{
			await interaction.editReply("Varför vill du pausa när jag inte spelar något? Din dumme fan")
			return;
		}

        // Pause the current song
		queue.setPaused(true);

        await interaction.editReply("Botfanskapet är pausad")
	},
}