const { SlashCommandBuilder } = require("@discordjs/builders")
const { channelMention, roleMention, userMention, User } = require('discord.js');
const runeData = require('../runesReforged.json')
const {Boots, LegendaryItems, MythicItems, Champions, Abilities} = require('../ultimateBraveryData.cjs');





module.exports = {
	data: new SlashCommandBuilder()
        .setName("ub")
        .setDescription("Gör league lite svårare"),
	execute: async ({ client, interaction, userMention }) => {


        function getRandomRune(max){
            return Math.floor(Math.random()* max)
        }
    
        const PrimaryRune = runeData[getRandomRune(5)];
        const SecondaryRune = PrimaryRune.slots[0].runes[getRandomRune(3)];
        const ThirdRune = PrimaryRune.slots[1].runes[getRandomRune(3)];
        const FourthRune = PrimaryRune.slots[2].runes[getRandomRune(3)];
        const FifthRune = PrimaryRune.slots[3].runes[getRandomRune(3)];
    
        const FullRunePage = PrimaryRune.name + " | " + SecondaryRune.name + " | " + ThirdRune.name + " | " + FourthRune.name + " | " + FifthRune.name;
    
        const RandomMythicItem = MythicItems[getRandomRune(26)];
        const RandomBoots = Boots[getRandomRune(7)];
        const RandomLegendaryItems1 = LegendaryItems[getRandomRune(69)];
        const RandomLegendaryItems2 = LegendaryItems[getRandomRune(69)];
        const RandomLegendaryItems3 = LegendaryItems[getRandomRune(69)];
        const RandomLegendaryItems4 = LegendaryItems[getRandomRune(69)];
    
        const RandomItems = RandomBoots + " | " + RandomMythicItem + " | " + RandomLegendaryItems1 + " | " + RandomLegendaryItems2 + " | " + RandomLegendaryItems3 + " | " + RandomLegendaryItems4;
        
        const RandomChamp = Champions[getRandomRune(162)];
        const RandomAbility = Abilities[getRandomRune(3)];

        const requestedUser = interaction.user;
		await interaction.reply(
            "Requested by: " + `${requestedUser}` + ('\n') +
            "**Champion: **"
            + ('\n') +
            RandomChamp 
            + ('\n') +
            "**Runes: **"
            + ('\n') +
            FullRunePage 
            + ('\n') +
            "**Items: **"
            + ('\n') +
            RandomItems
            + ('\n') +
            "**Ability to max: **"
            + ('\n') +
            RandomAbility
            );
            return;

	},
}