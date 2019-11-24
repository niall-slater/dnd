import Character from './Character'

class CharacterBuilder {
  
  generate()
  {
    var c = new Character();
    return c.stats;
  }
  
}

var builder = new CharacterBuilder();

export default builder;