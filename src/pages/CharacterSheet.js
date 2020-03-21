import React from 'react';
import Stat from '../components/Stat';
import StatLongText from '../components/StatLongText';
import RollGroup from '../components/dice/RollGroup';
import StatHelper from '../helpers/StatHelper';

class CharacterSheet extends React.Component{

  constructor(props) {
    super(props);

    var character = this.props.character;

    this.state = {
      activeCharacter: character
    };
  }

  renderName = () => {
    var character = this.state.activeCharacter;
    return (
      <div className="row">
        <div className="col">
          <h1>{character.name}</h1>
          <p className="ml-1">Lvl.{character.level} {character.race.name} {character.class.name}</p>
        </div>
      </div>
    );
  }

  renderStats = () =>  {
    var character = this.state.activeCharacter;
    var proficiency = "+" + character.proficiencyBonus;
    var speed = character.speed + "ft";
    var hitDie = "1d" + character.class.hitDie;
    return(
      <div className="row">
        <div className="col-3">
          <Stat name="Lvl" value={character.level}></Stat>
          <Stat name="HP" value={character.hp + "/" + character.maxHp}></Stat>
          <Stat name="AC" value={character.ac}></Stat>
        </div>
        <div className="col-9">
          <p><StatLongText name="Speed" value={speed}></StatLongText></p>
          <p><StatLongText name="Hit die" value={hitDie}></StatLongText></p>
          <p><StatLongText name="Alignment" value={character.alignmentName}></StatLongText></p>
        </div>
      </div>
    );
  }

  renderRolls = () =>  {
    var character = this.state.activeCharacter;
    return(
      <RollGroup character={character} />
    );
  }

  renderSpells = () =>  {
    var character = this.state.activeCharacter;
    var sc = StatHelper.GetSpellcastingAbilityModifier(character);
    var save = 8 + sc;
    return(
      <div className="row">
      <div className="col-6">
        <p><Stat name="SC" value={sc}></Stat></p>
        <p><Stat name="DC" value={save}></Stat></p>
        <br />
      </div>
        <div className="col-6">
        <button className="btn btn-primary btn-large" disabled>Cast a spell</button>
        <p className="text-muted">Spell slots coming soon</p>
        </div>
      </div>
    );
  }

  renderRests = () => {
    var character = this.state.activeCharacter;
    return(
      <div className="row">
        <div className="btn-group">
          <button className="btn btn-secondary">Short rest</button>
          <button className="btn btn-primary">Long rest</button>
        </div>
      </div>
    );
  }

  render() {
    var name = this.renderName();
    var stats = this.renderStats();
    var rolls = this.renderRolls();
    var spells = this.renderSpells();
    var rests = this.renderRests();
    return(
        <div className={`container toolBox ${this.state.loading ? "loading" : ""}`}>
          <h3 className="text-muted">Character sheet</h3>
          <div className="container">
            {name}
          </div>
          <p>Attributes</p>
          <hr />
          <div className="container">
            {stats}
          </div>
          <hr />
          <p>Dice rolls</p>
          <div className="container">
            {rolls}
          </div>
          <hr />
          <p>Spellcasting</p>
          <div className="container">
            {spells}
          </div>
          <hr />
          <p>Rests</p>
          <div className="container">
            {rests}
          </div>
        </div>
    );
  }
}

export default CharacterSheet;