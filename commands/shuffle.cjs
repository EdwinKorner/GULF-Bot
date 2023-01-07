const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("Shuffla kön"),
	execute: async ({ client, interaction }) => {
        await interaction.deferReply();

        const queue = client.player.getQueue(interaction.guildId)

        if (!queue)
        {
            await interaction.editReply("Tommaste kön jag sett i mitt liv");
            return;
        }

        if(queue.tracks.length < 3){
            await interaction.editReply("Det måste finnas minst 3 låtar i kön");
            return;
        }

        queue.shuffle();

        await interaction.editReply("Kön är nu shufflad");
	},
}