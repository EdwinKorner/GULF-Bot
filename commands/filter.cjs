const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed, MessageFlags, Options } = require("discord.js")
const { QueryType, Player } = require("discord-player");

module.exports = {
	data: new SlashCommandBuilder()
        .setName("filter")
        .setDescription("Filters commands")
        .addSubcommand(subcommand =>
			subcommand
				.setName("8d")
				.setDescription("Lägger 8d på musiken")
		    )
        .addSubcommand(subcommand =>
            subcommand
                .setName("low_bassboost")
                .setDescription("Lägger låg bassboost på musiken")
            )
            .addSubcommand(subcommand =>
                subcommand
                    .setName("medium_bassboost")
                    .setDescription("Lägger medium bassboost på musiken")
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName("high_bassboost")
                        .setDescription("Lägger hög bassboost på musiken")
                    )
                    .addSubcommand(subcommand =>
                        subcommand
                            .setName("earrape")
                            .setDescription("Lägger earrape på musiken")
                        )
                        .addSubcommand(subcommand =>
                            subcommand
                                .setName("bassboost_off")
                                .setDescription("Tar bort bassboost från musiken")
                            )
                            .addSubcommand(subcommand =>
                                subcommand
                                    .setName("nightcore")
                                    .setDescription("Lägger nightcore på musiken")
                                )
                                .addSubcommand(subcommand =>
                                    subcommand
                                        .setName("vibrato")
                                        .setDescription("Lägger vibrato på musiken")
                                    )
                                    .addSubcommand(subcommand =>
                                        subcommand
                                            .setName("clear")
                                            .setDescription("Tar bort alla filter från musiken")
                                        ),

	execute: async ({ client, interaction }) => {
        await interaction.deferReply();

        const queue = client.player.getQueue(interaction.guildId)

		if (!queue)
		{
			await interaction.editReply("Det finns inga låtar i kön kompis")
			return;
		}
        if(interaction.options.getSubcommand() === "8d"){
            await queue.setFilters({
                "8D": !queue.getFiltersEnabled().includes("8D")
              });
        }else if(interaction.options.getSubcommand() === "low_bassboost"){
            await queue.setFilters({
                bassboost_low: true
              });
        }else if(interaction.options.getSubcommand() === "medium_bassboost"){
            await queue.setFilters({
                bassboost: true
              });
        }else if(interaction.options.getSubcommand() === "high_bassboost"){
            await queue.setFilters({
                bassboost_high: true
              });
        }else if(interaction.options.getSubcommand() === "earrape"){
            await queue.setFilters({
                earrape: true
              });
        }else if(interaction.options.getSubcommand() === "bassboost_off"){
            await queue.setFilters({
                bassboost_low: false,
                bassboost: false,
                bassboost_high: false,
                earrape: false
              });
        }else if(interaction.options.getSubcommand() === "nightcore"){
            await queue.setFilters({
                nightcore: true
              });
        }else if(interaction.options.getSubcommand() === "vibrato"){
            await queue.setFilters({
                vibrato: true
              });
        }else if(interaction.options.getSubcommand() === "clear"){
            await queue.setFilters({});
        }

        await interaction.editReply(
            "Filtret lades till"
        )
	},
}