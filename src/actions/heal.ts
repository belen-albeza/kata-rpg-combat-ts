import { Healer } from ".";

export default class HealAction {
  readonly source: Healer;

  constructor(source: Healer) {
    this.source = source;
  }

  run() {
    if (!this.source.isAlive) {
      throw new Error("Dead characters cannot heal");
    }

    this.source.health += this.source.healing;
  }
}
