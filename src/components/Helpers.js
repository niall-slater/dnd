export default class Helpers {

  /* DICE ROLLS */  
  static rollDice(sides, numberOfDice) {
    var result = 0;
    for (var i = 0; i < numberOfDice; i++) {
      result += this.rollDie(sides);
    }
    return result;
  }

  static rollDie(sides) {
    return Math.ceil(Math.random() * sides);
  }
  
  /* ARRAY OPERATIONS */
  static removeSmallest(arr) {
    var min = Math.min(...arr);
    return arr.filter(e => e !== min);
  }

  static getTotal(arr) {
    var total = 0;
    arr.forEach((x) => total += x);
    return total;
  }
}