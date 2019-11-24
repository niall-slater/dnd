import Helpers from './Helpers';

class Character {
  
  constructor(stats) {
    if (!stats) {
      this.buildRandom();
    }
  }
  
  buildRandom() {
    this.stats = {
      str: 0,
      dex: 0,
      con: 0,
      int: 0,
      wis: 0,
      cha: 0,
    }
    
    for (var statKey in this.stats) {
      var result = 0;
      var initRolls = [];
      for (var i = 0; i < 4; i++) {
        initRolls.push(Helpers.rollDie(6));
      }
      initRolls = Helpers.removeSmallest(initRolls);
      result = Helpers.getTotal(initRolls);
      this.stats[statKey] = result;
    }
  }
}

export default Character;