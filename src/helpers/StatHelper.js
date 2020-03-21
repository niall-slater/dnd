export default class StatHelper {

  static GetSpellcastingAbilityModifier(character) {
    var spellModifier = character.proficiencyBonus;
    console.log(spellModifier);

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
}