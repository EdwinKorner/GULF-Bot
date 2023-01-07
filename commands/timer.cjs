const { SlashCommandBuilder, channelMention,} = require("@discordjs/builders")
const { MessageEmbed, Channel, Message, MessageReaction, Client } = require('discord.js');
const { Countdown, MONTHS } = require('countdown');


module.exports = {
    data: new SlashCommandBuilder()
    .setName("timer")
    .setDescription("Starta en timer")
    .addNumberOption((option) => option.setName('minutes').setDescription('Set amount of minutes').setRequired(true))
    .addNumberOption((option) => option.setName('seconds').setDescription('Set amount of seconds').setRequired(true)),
    
	execute: async ({ client, interaction}) => {
        await interaction.deferReply();    
        
        
        let minutes = interaction.options.getNumber("minutes")
        let seconds = interaction.options.getNumber("seconds")
        
        let minutesToSeconds = minutes*60;
        
        let time = minutesToSeconds + seconds;
        
        let duration = time;
        
                // Respond with the embed containing information about the player
                await interaction.editReply(`
                Timer: **${duration}**
                `)      
    
                let interval = setInterval(() => {
                    duration--;
                    interaction.editReply(`
                    Timer: **${duration}**
                    `)
                    if(duration <= 0) {
                        clearInterval(interval);
                        interaction.editReply(`
                        Timern är klar
                        `)
                    }
                }, 1000)
        
	},
}
