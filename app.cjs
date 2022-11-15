

require('dotenv').config();

const {REST} = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents, Collection, Collector } = require('discord.js');
const { Player } = require("discord-player")
const {RandomWordsArray} = require('./MAO.cjs');


const fs = require('fs');
const path = require('path');
const { channel } = require('diagnostics_channel');
const { spoiler } = require('@discordjs/builders');


const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

// List of all commands
const commands = [];
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands"); // E:\yt\discord bot\js\intro\commands
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.cjs'));
for(const file of commandFiles)
{
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}

// Add the player on the client
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    },
    spotifyBridge: false,
})

client.on("ready", () => {
    // Get all ids of the servers
    const guild_ids = client.guilds.cache.map(guild => guild.id);
    console.log("I am ready")

    const rest = new REST({version: '9'}).setToken(process.env.DISCORD_BOT_TOKEN);
    for (const guildId of guild_ids)
    {
        rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), 
            {body: commands})
        .then(() => console.log('Successfully updated commands for guild ' + guildId))
        .catch(console.error);
    }
});

client.on("interactionCreate", async interaction => {
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if(!command) return;

    try
    {
        await command.execute({client, interaction});
    }
    catch(error)
    {
        console.error(error);
        await interaction.reply({content: "There was an error executing this command"});
    }
});
client.login(process.env.DISCORD_BOT_TOKEN);

//Timer



let PREFIX = '/'

client.on('message', message => {
    if(message.content.startsWith(PREFIX) && message.content.endsWith("MAO")){
        
        let duration = 10;
        let getTime = "Timer: " + duration
        let botMessage = message.channel;
        botMessage.send(getTime);
        let interval = setInterval(() => {
            duration--;
            botMessage.lastMessage.edit("Timer: " + duration)
            if(duration <= 0) {
                clearInterval(interval);
                botMessage.lastMessage.edit("Timern är klar")
            }
        }, 1000)

        function getRandomWord(max){
            return Math.floor(Math.random()* max)
        }
        
        // let forLength = 5;
        // let Words = ""
        let DM = message.author;
        
        // for(let i = 0; i < forLength; i++) {
        //     Words += RandomWordsArray[getRandomWord(12)] + '\n'
        // }
        // DM.send(`||${Words}||`)

        

        const Word1 = RandomWordsArray[getRandomWord(12)]
        const Word2 = RandomWordsArray[getRandomWord(12)]
        const Word3 = RandomWordsArray[getRandomWord(12)]
        const Word4 = RandomWordsArray[getRandomWord(12)]
        const Word5 = RandomWordsArray[getRandomWord(12)]
        const Word6 = RandomWordsArray[getRandomWord(12)]

        DM.send(`
        **Ord: **
        **Ord1:**
        ||${Word1}||
        **Ord2: **
        ||${Word2}||
        **Ord3: **
        ||${Word3}||
        **Ord4: **
        ||${Word4}||
        **Ord5: **
        ||${Word5}||
        **Ord6: **
        ||${Word6}||
        `);
       
    }
})

//restart bot
client.on('message', message => {
    if(message.content.startsWith(PREFIX) && message.content.endsWith("restart")) {
        if(message.author.id !== '236574009641140226') return false;
        resetBot();
        message.channel.send("Omstartad")
    }
})

client.on('message', message =>{
    const answers = [
        "100%",
        "Absolut",
        "Ja",
        "Nej",
        "Absolut inte",
        "Aldrig"
    ]
    if(message.content.startsWith("/8ball")){
        function getRandomAnswer(max){
            return Math.floor(Math.random()* max)
        }
    
        let randomAnswer = answers[getRandomAnswer(6)]
        
        message.channel.lastMessage.reply(randomAnswer)  

    }
})

function resetBot(){
    client.destroy();
    client.login(process.env.DISCORD_BOT_TOKEN);
}






