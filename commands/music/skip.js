import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips the current song");
export async function execute({ client, interaction }) {

    // Get the queue for the server
    const queue = client.player.getQueue(interaction.guildId);

    // If there is no queue, return
    if (!queue) {
        await interaction.reply("There are no songs in the queue");
        return;
    }

    const currentSong = queue.current;

    // Skip the current song
    queue.skip();

    // Return an embed to the user saying the song has been skipped
    await interaction.reply({
        embeds: [
            new MessageEmbed()
                .setDescription(`${currentSong.title} has been skipped!`)
                .setThumbnail(currentSong.thumbnail)
        ]
    });
}