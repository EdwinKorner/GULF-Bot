const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueryType, Player } = require("discord-player");
const { AudioPlayer } = require("@discordjs/voice");
const { musikData } = require("../musikQuizData.cjs")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("mq")
        .setDescription("Starta musikquiz"),
	execute: async ({ client, interaction}) => {
    
        if (!interaction.member.voice.channel) return interaction.reply("Du måste vara i en vc för att spela musik din schliriga jävel");
        const queue = await client.player.createQueue(interaction.guild);
        if (!queue.connection) await queue.connect(interaction.member.voice.channel)

        function getRandomSong(max){
            return Math.floor(Math.random()* max)
        }

        let randomObject = musikData[getRandomSong(32)];
        let url = randomObject.url
        const result = await client.player.search(url, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO
        })
        if (result.tracks.length === 0)
                return interaction.editReply("No results")
            
            // Add the track to the queue
            const song = result.tracks[0]
            await queue.addTrack(song)

                await queue.play()
                
                setTimeout(() => {
                    queue.setPaused(true)
                    console.log("Paused")
                }, 8000)
                setTimeout(() => {
                    queue.skip();
                    console.log("Skipped")    
                }, 20000)

                let duration = 20;
                // Respond with the embed containing information about the player
                await interaction.reply(`
                Du har 20 sekunder på dig att gissa låt och artist! \n Timer: **${duration}**
                `)      
    
                let interval = setInterval(() => {
                    duration--;
                    interaction.editReply(`
                    Du har 20 sekunder på dig att gissa låt och artist! \n Timer: **${duration}**
                    `)
                    if(duration <= 0) {
                        clearInterval(interval);
                        interaction.editReply(`
                        Låt: **${randomObject.song}** \n Artist: **${randomObject.artist}**
                        `)
                    }
                }, 1000)

                let artistGuess = false;
                let songGuess = false;
                console.log(songGuess)
                console.log(artistGuess)
                client.on('message', message => {
                    if(message.content.toLowerCase() === randomObject.song.toLowerCase() && duration > 0){
                        message.reply(`Rätt låt, 1 poäng :)`);
                        songGuess = true;
                        console.log(songGuess)
                    }else if(message.content.toLowerCase() === randomObject.artist.toLowerCase() && duration > 0){
                        message.reply(`Rätt artist, 1 poäng :)`)
                        artistGuess = true;
                        console.log(artistGuess)
                    }
                    else if(artistGuess === true && songGuess === true){
                        duration = 0;
                    }
                })
	},
}