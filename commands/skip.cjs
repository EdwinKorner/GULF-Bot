const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skippa låten som spelas"),

	execute: async ({ client, interaction }) => {
        await interaction.deferReply();

        // Get the queue for the server
		const queue = client.player.getQueue(interaction.guildId)

        // If there is no queue, return
		if (!queue)
        {
            await interaction.editReply("Tommaste kön jag sett i mitt liv");
            return;
        }

        const currentSong = queue.current

        // Skip the current song
		queue.skip()

        // Return an embed to the user saying the song has been skipped
        await interaction.editReply({
            embeds: [
                new MessageEmbed()
                    .setDescription(`${currentSong.title} var tydligen en förjävla dålig låt`)
                    .setThumbnail(currentSong.thumbnail)
            ]
        })
	},
}