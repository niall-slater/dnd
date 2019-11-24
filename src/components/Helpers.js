class Helpers {

  /* DICE ROLLS */  
  rollDice(sides, numberOfDice) {
    var result = 0;
    for (var i = 0; i < numberOfDice; i++) {
      result += this.rollDie(sides);
    }
    return result;
  }

  rollDie(sides) {
    return Math.ceil(Math.random() * sides);
  }
  
  /* ARRAY OPERATIONS */
  removeSmallest(arr) {
    var min = Math.min(...arr);
    return arr.filter(e => e != min);
  }

  getTotal(arr) {
    var total = 0;
    arr.forEach((x) => total += x);
    return total;
  }
}

var helper = new Helpers();

export default helper;