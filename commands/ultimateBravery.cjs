const { SlashCommandBuilder } = require("@discordjs/builders")
const { channelMention, roleMention, userMention, User } = require('discord.js');
const runeData = require('../runesReforged.json')
const {Boots, LegendaryItems, MythicItems, Champions, Abilities, SummonerSpells} = require('../ultimateBraveryData.cjs');





module.exports = {
	data: new SlashCommandBuilder()
        .setName("ub")
        .setDescription("Gör league lite svårare"),
	execute: async ({ client, interaction, userMention }) => {


        function getRandomRune(max){
            return Math.floor(Math.random()* max)
        }
        
        const PrimaryRunesArray = [
            runeData[0],
            runeData[1],
            runeData[2],
            runeData[3],
            runeData[4]
        ]
        const PrimaryRune = PrimaryRunesArray[getRandomRune(5)];
        PrimaryRunesArray.splice(PrimaryRunesArray.indexOf(PrimaryRune), 1)
        console.log(PrimaryRune)
        console.log(PrimaryRunesArray);
        const SecondaryRune = PrimaryRune.slots[0].runes[getRandomRune(3)];
        const ThirdRune = PrimaryRune.slots[1].runes[getRandomRune(3)];
        const FourthRune = PrimaryRune.slots[2].runes[getRandomRune(3)];
        const FifthRune = PrimaryRune.slots[3].runes[getRandomRune(3)];
    
        
        const SmallRunes = PrimaryRunesArray[getRandomRune(4)];
        const SmallFirstRune = SmallRunes.slots[1].runes[getRandomRune(3)];;
        const SmallSecondRune = SmallRunes.slots[2].runes[getRandomRune(3)];;
        const SmallThirdRune = SmallRunes.slots[3].runes[getRandomRune(3)];;
        const SecondaryRunesArray = [
            SmallFirstRune,
            SmallSecondRune,
            SmallThirdRune,
        ]
        
        const RandomSecondaryRune1 = SecondaryRunesArray[getRandomRune(3)];
        SecondaryRunesArray.splice(SecondaryRunesArray.indexOf(RandomSecondaryRune1), 1)
        const RandomSecondaryRune2 = SecondaryRunesArray[getRandomRune(3)];

        const FullRunePage = SecondaryRune.name + " | " + ThirdRune.name + " | " + FourthRune.name + " | " + FifthRune.name;
        const FullSecondRunePage = RandomSecondaryRune1.name + " | " + RandomSecondaryRune2.name;

        const RandomSummonerSpell1 = SummonerSpells[getRandomRune(8)]
        SummonerSpells.splice(SummonerSpells.indexOf(RandomSummonerSpell1), 1)
        const RandomSummonerSpell2 = SummonerSpells[getRandomRune(7)]
        const RandomSummonerSpells = RandomSummonerSpell1 + " | " + RandomSummonerSpell2
    
        const RandomMythicItem = MythicItems[getRandomRune(26)];
        const RandomBoots = Boots[getRandomRune(7)];
        const RandomLegendaryItems1 = LegendaryItems[getRandomRune(70)];
        MythicItems.splice(MythicItems.indexOf(RandomLegendaryItems1), 1)
        const RandomLegendaryItems2 = LegendaryItems[getRandomRune(69)];
        MythicItems.splice(MythicItems.indexOf(RandomLegendaryItems2), 1)
        const RandomLegendaryItems3 = LegendaryItems[getRandomRune(68)];
        MythicItems.splice(MythicItems.indexOf(RandomLegendaryItems3), 1)
        const RandomLegendaryItems4 = LegendaryItems[getRandomRune(67)];
    
        const RandomItems = RandomBoots + " | " + RandomMythicItem + " | " + RandomLegendaryItems1 + " | " + RandomLegendaryItems2 + " | " + RandomLegendaryItems3 + " | " + RandomLegendaryItems4;
        
        const RandomChamp = Champions[getRandomRune(162)];
        const RandomAbility = Abilities[getRandomRune(3)];

        const FirstBonusStatArray = [
            "Adaptive Force",
            "Attack Speed",
            "Ability Haste"
        ]
        const FirstBonusStat = FirstBonusStatArray[getRandomRune(3)];
        const SecondBonusStatArray = [
            "Adaptive Force",
            "Armor",
            "Magic Resistance"
        ]
        const SecondBonusStat = SecondBonusStatArray[getRandomRune(3)];
        const ThirdBonusStatArray = [
            "Health",
            "Armor",
            "Magic Resistance"
        ]
        const ThirdBonusStat = ThirdBonusStatArray[getRandomRune(3)];
        const FullBonusStats = FirstBonusStat + " | " + SecondBonusStat + " | " + ThirdBonusStat;

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
            FullSecondRunePage 
            + ('\n') +
            FullBonusStats
            + ('\n') +
            "**Items: **"
            + ('\n') +
            RandomItems
            + ('\n') +
            "**Summoner Spells: **"
            + ('\n') +
            RandomSummonerSpells
            + ('\n') +
            "**Ability to max: **"
            + ('\n') +
            RandomAbility
            );
            return;

	},
}