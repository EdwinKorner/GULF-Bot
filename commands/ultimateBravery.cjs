const { SlashCommandBuilder, EmbedBuilder, inlineCode } = require("@discordjs/builders")
const { channelMention, roleMention, userMention, User, MessageAttachment} = require('discord.js');
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
        
        const RandomSecondaryRune1 = SecondaryRunesArray[getRandomRune(SecondaryRunesArray.length)];
        SecondaryRunesArray.splice(SecondaryRunesArray.indexOf(RandomSecondaryRune1), 1)
        const RandomSecondaryRune2 = SecondaryRunesArray[getRandomRune(SecondaryRunesArray.length)];

        const FullRunePage = SecondaryRune.icon.toString() + " | " + ThirdRune.icon + " | " + FourthRune.icon + " | " + FifthRune.icon;
        const FullSecondRunePage = RandomSecondaryRune1.icon + " | " + RandomSecondaryRune2.icon;
        console.log(FullSecondRunePage)
        const RandomSummonerSpell1 = SummonerSpells[getRandomRune(8)]
        SummonerSpells.splice(SummonerSpells.indexOf(RandomSummonerSpell1), 1)
        const RandomSummonerSpell2 = SummonerSpells[getRandomRune(7)]
        const RandomSummonerSpells = RandomSummonerSpell1 + " | " + RandomSummonerSpell2
    
        const RandomMythicItem = MythicItems[getRandomRune(26)];
        const RandomBoots = Boots[getRandomRune(7)];
        const RandomLegendaryItems1 = LegendaryItems[getRandomRune(66)];
        MythicItems.splice(MythicItems.indexOf(RandomLegendaryItems1), 1)
        const RandomLegendaryItems2 = LegendaryItems[getRandomRune(65)];
        MythicItems.splice(MythicItems.indexOf(RandomLegendaryItems2), 1)
        const RandomLegendaryItems3 = LegendaryItems[getRandomRune(64)];
        MythicItems.splice(MythicItems.indexOf(RandomLegendaryItems3), 1)
        const RandomLegendaryItems4 = LegendaryItems[getRandomRune(63)];
    
        const RandomItems = RandomBoots + " | " + RandomMythicItem + " | " + RandomLegendaryItems1 + " | " + RandomLegendaryItems2 + " | " + RandomLegendaryItems3 + " | " + RandomLegendaryItems4;
        
        const RandomChamp = Champions[getRandomRune(162)];
        const RandomAbility = Abilities[getRandomRune(3)];

        const FirstBonusStatArray = [
            "commands/perk-images/StatMods/StatModsAdaptiveForceIcon.png",
            "commands/perk-images/StatMods/StatModsAttackSpeedIcon.png",
            "commands/perk-images/StatMods/StatModsCDRScalingIcon.png"
        ]
        const FirstBonusStat = FirstBonusStatArray[getRandomRune(3)];
        const SecondBonusStatArray = [
            "commands/perk-images/StatMods/StatModsAdaptiveForceIcon.png",
            "commands/perk-images/StatMods/StatModsArmorIcon.png",
            "commands/perk-images/StatMods/StatModsMagicResIcon.MagicResist_Fix.png"
        ]
        const SecondBonusStat = SecondBonusStatArray[getRandomRune(3)];
        const ThirdBonusStatArray = [
            "commands/perk-images/StatMods/StatModsArmorIcon.png",
            "commands/perk-images/StatMods/StatModsHealthScalingIcon.png",
            "commands/perk-images/StatMods/StatModsMagicResIcon.MagicResist_Fix.png"
        ]
        const ThirdBonusStat = ThirdBonusStatArray[getRandomRune(3)];
        const FullBonusStats = FirstBonusStat + " | " + SecondBonusStat + " | " + ThirdBonusStat;

        const ImagesArray = [
            "commands/"+SecondaryRune.icon,
            "commands/"+ThirdRune.icon,
            "commands/"+FourthRune.icon,
            "commands/"+FifthRune.icon,
        ]

        const SmallRunesArray = [
            "commands/"+SmallFirstRune.icon,
            "commands/"+SmallSecondRune.icon,
            "commands/"+SmallThirdRune.icon,
        ]
        console.log(SecondaryRune.icon)
        
        const attachment = new MessageAttachment(
            ImagesArray[0],
        )
        const attachment2 = new MessageAttachment(
            ImagesArray[1],
        )
        const attachment3 = new MessageAttachment(
            ImagesArray[2],
        )
        const attachment4 = new MessageAttachment(
            ImagesArray[3],
        )
        const attachment5 = new MessageAttachment(
            SmallRunesArray[0]
        )
        const attachment6 = new MessageAttachment(
            SmallRunesArray[1]
        )
        const attachment7 = new MessageAttachment(
            SmallRunesArray[2]
        )
        const attachment8 = new MessageAttachment(
            FirstBonusStat
        )
        const attachment9 = new MessageAttachment(
            SecondBonusStat
        )
        const attachment10 = new MessageAttachment(
            ThirdBonusStat
        )
        const attachment11 = new MessageAttachment(
            RandomMythicItem
        )
            console.log(attachment11)
            console.log(attachment2)
        const requestedUser = interaction.user;
		await interaction.reply(
            {files: [attachment, attachment2, attachment3, attachment4, attachment5, attachment6, attachment7, attachment8, attachment9, attachment10, attachment11,]}
            


            // "Requested by: " + `${requestedUser}` + ('\n') +  +
            // "**Champion: **"
            // + ('\n') +
            // RandomChamp 
            // + ('\n') +
            // "**Runes: **"
            // + ('\n') +
            // FullRunePage 
            // + ('\n') +
            // FullSecondRunePage 
            // + ('\n') +
            // FullBonusStats
            // + ('\n') +
            // "**Items: **"
            // + ('\n') +
            // RandomItems
            // + ('\n') +
            // "**Summoner Spells: **"
            // + ('\n') +
            // RandomSummonerSpells
            // + ('\n') +
            // "**Ability to max: **"
            // + ('\n') +
            // RandomAbility
            );
            return;

	},
}