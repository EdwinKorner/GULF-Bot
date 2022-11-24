const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("Shuffla kön"),
	execute: async ({ client, interaction }) => {

        const queue = client.player.getQueue(interaction.guildId)

        if (!queue)
        {
            await interaction.reply("Tommaste kön jag sett i mitt liv");
            return;
        }

        if(queue.tracks.length < 3){
            await interaction.reply("Det måste finnas minst 3 låtar i kön");
            return;
        }

        queue.shuffle();

        await interaction.reply("Kön är nu shufflad");
	},
}