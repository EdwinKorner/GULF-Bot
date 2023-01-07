const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("roll")
		.setDescription("Roll random number")
		.addNumberOption(option =>
					option.setName("number").setDescription("search keywords").setRequired(true)
				),
	execute: async ({ client, interaction }) => {
        await interaction.deferReply();
        
        

            
            let rollnumber = interaction.options.getNumber("number")
            
            function getRandomNumber(max){
                return Math.floor(Math.random()* max)
            }

            const result = getRandomNumber(rollnumber);
		
        
        await interaction.editReply(
            "You rolled: " + result
        )
	},
}