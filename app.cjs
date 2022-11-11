

require('dotenv').config();

const {REST} = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents, Collection } = require('discord.js');
const { Player } = require("discord-player")


const fs = require('fs');
const path = require('path');
const { channel } = require('diagnostics_channel');


const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]
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

let minutes = 2
let seconds = 0
let minutesToSeconds = minutes*60;

let time = minutesToSeconds + seconds;

let duration = time;

let getTime = "Timer: " + duration

let PREFIX = 'g!'

client.on('message', message => {
    if(message.content.startsWith(PREFIX) && message.content.endsWith(" timer")){
        
        let botMessage = message.channel;
        botMessage.send(getTime);
        let interval = setInterval(() => {
            duration--;
            botMessage.lastMessage.edit("Timer: " + duration)
            if(duration <= 0) {
                clearInterval(interval);
                botMessage.lastMessage.edit("Timer is done")
            }
        }, 1000)
    }
})

//restart bot
client.on('message', message => {
    if(message.content.startsWith(PREFIX) && message.content.endsWith(" restart")) {
        if(message.author.id !== '236574009641140226') return false;
        resetBot();
        message.channel.send("Omstartad")
    }
})

function resetBot(){
    client.destroy();
    client.login(process.env.DISCORD_BOT_TOKEN);
}






