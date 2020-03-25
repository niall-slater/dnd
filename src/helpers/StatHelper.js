import {Stats} from '../globals/Stats.Const';

export default class StatHelper {

  static GetSpellcastingAbilityModifier(character) {
    var spellModifier = character.proficiencyBonus;
    switch (character.class.name) {
      case "Ranger": spellModifier += character.stats.wisModifier; break;
      case "Druid": spellModifier += character.stats.wisModifier; break;
      case "Cleric": spellModifier += character.stats.wisModifier; break;
      case "Bard": spellModifier += character.stats.chaModifier; break;
      case "Paladin": spellModifier += character.stats.chaModifier; break;
      case "Sorcerer": spellModifier += character.stats.chaModifier; break;
      case "Warlock": spellModifier += character.stats.chaModifier; break;
      case "Wizard": spellModifier += character.stats.intModifier; break;
      default: spellModifier = 0;
    }

    return spellModifier;
  }

  static GetModifier(stat) {
    return Math.floor((stat - 10) / 2);
  }

  static GetAssociatedModifier(skillName, character)
  {
      if (skillName == Stats.SKILL.ATHLETICS)
      {
          return character.stats.strModifier;
      }

      if (skillName == Stats.SKILL.ACROBATICS || skillName == Stats.SKILL.SLEIGHTOFHAND || skillName == Stats.SKILL.STEALTH)
      {
          return character.stats.dexModifier;
      }

      if (skillName == Stats.SKILL.ARCANA || skillName == Stats.SKILL.HISTORY || skillName == Stats.SKILL.INVESTIGATION
          || skillName == Stats.SKILL.NATURE || skillName == Stats.SKILL.RELIGION)
      {
          return character.stats.intModifier;
      }

      if (skillName == Stats.SKILL.ANIMALHANDLING || skillName == Stats.SKILL.INSIGHT || skillName == Stats.SKILL.MEDICINE
          || skillName == Stats.SKILL.PERCEPTION || skillName == Stats.SKILL.SURVIVAL)
      {
          return character.stats.wisModifier;
      }

      if (skillName == Stats.SKILL.DECEPTION || skillName == Stats.SKILL.INTIMIDATION || skillName == Stats.SKILL.PERFORMANCE
          || skillName == Stats.SKILL.PERSUASION)
      {
          return character.stats.chaModifier;
      }

      return 0;
  }
}