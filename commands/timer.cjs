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
        
        
        
        let minutes = interaction.options.getNumber("minutes")
        let seconds = interaction.options.getNumber("seconds")
        
        let minutesToSeconds = minutes*60;
        
        let time = minutesToSeconds + seconds;
        
        let duration = time;
        
        
        let getTime = "Timer: " + duration
        
        let interval = setInterval((timerMessage) => {
            duration--;
            if(duration == 0) {
                clearInterval(interval);
                getTime ="Timer is done"
            }
            console.log(duration)
        }, 1000)
        
        
        client.data.channel.send("blah blah").then((msg)=>{
            client.message.edit("Timer: " + duration)
            //your code here! msg.edit will work here.
        })
        
	},
}
