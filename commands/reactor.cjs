const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("reactor")
        .setDescription("Returns reactions"),
	execute: async ({ client, interaction }) => {
        const message = await interaction.reply({
            content: `React here!`,
            fetchReply: true
        });
        // const question = channel.send("A")
        message.react('✅');

        const filter = (reaction, user) => {
            return reaction.emoji.name == '✅' && user.id == interaction.user.id
        };

        const collector = message.createReactionCollector({filter, time: 10000});
        
        collector.on('collect', (reaction, user) => {
            // console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
            message.channel.send("Röv")
            // message.channel.lastMessage.edit('✅')
            
        });
        

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
        });
		
	},
}