import Character from "../character";

export default class HealAction {
  readonly source: Character;

  constructor(source: Character) {
    this.source = source;
  }

  run() {
    if (!this.source.isAlive) {
      throw new Error("Dead characters cannot heal");
    }

    this.source.health += this.source.healing;
  }
}
