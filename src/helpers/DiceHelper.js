export default class DiceHelper {

  static RollDice(number, facets) {
    var result = 0;

    for (var i = 0; i < number; i++) {
      result += this.RollDie(facets);
    }

    return result;
  }

  static RollDie(facets) {
    return 1 + Math.floor(Math.random() * facets);
  }

  static RollSavingThrow(modifier) {
    return this.RollDie(20) + modifier;
  }
}