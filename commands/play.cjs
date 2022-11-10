const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueryType, Player } = require("discord-player");
const { AudioPlayer } = require("@discordjs/voice");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Spelar en låt från YouTube/Soundcloud.")
		.addSubcommand(subcommand =>
			subcommand
				.setName("song")
				.setDescription("Söker efter en låt och spelar den")
				.addStringOption(option =>
					option.setName("searchterms").setDescription("search keywords").setRequired(true)
				)
		),
	execute: async ({ client, interaction }) => {
        // Check if user is in vc
		if (!interaction.member.voice.channel) return interaction.reply("Du måste vara i en vc för att spela musik din schliriga jävel");

        // Create queue for the bot
		const queue = await client.player.createQueue(interaction.guild);
        // Wait until you are connected to the channel
		if (!queue.connection) await queue.connect(interaction.member.voice.channel)

		let embed = new MessageEmbed()
        
        if (interaction.options.getSubcommand() === "song") {

            // Search for song
            let url = interaction.options.getString("searchterms")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })

            // finish if no tracks were found
            if (result.tracks.length === 0)
                return interaction.editReply("No results")
            
            // Add the track to the queue
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** ligger nu i kön`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration}`})
		}

        // Play the song
        if (!queue.playing) await queue.play()
        
        // Respond with the embed containing information about the player
        await interaction.reply({
            embeds: [embed]
        })
	},
}