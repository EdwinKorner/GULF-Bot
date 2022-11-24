const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { Lyrics } = require("@discord-player/extractor");
const lyricsClient = Lyrics.init();

module.exports = {
	data: new SlashCommandBuilder()
        .setName("lyrics")
        .setDescription("Visar texten för låten som spelas")
        .addSubcommand(subcommand =>
			subcommand
				.setName("låt")
				.setDescription("Vilken låt vill du ha texten till?")
				.addStringOption(option =>
					option.setName("searchterms").setDescription("search keywords").setRequired(true)
				)
		),
	execute: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)
        let embed = new MessageEmbed()

        if (interaction.options.getSubcommand() === "låt") {
            const query = interaction.options.getString("searchterms", false) ?? queue?.current?.title;

            if(!query){
                await interaction.reply("Du glömde skriva namn på låten");
                return;
            }

            const queryFormated = query
            .toLowerCase()
            .replace(/\(lyrics|lyric|official music video|official video hd|official video|audio|official|clip officiel|clip|extended|hq\)/g, "");

            const result = await lyricsClient.search(`${queryFormated}`);

            if (!result || !result.lyrics){
                await interaction.reply("Jag hittade ingen text till denna låten");
                return;
            }
            embed.setDescription(`${result.lyrics.slice(0, 4090)}...`).setTitle(`${query}`);
        }

        await interaction.reply({
            embeds: [embed]
        })

	},
}