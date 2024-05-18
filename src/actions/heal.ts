import { AllianceInformer, Healer, HealTarget } from ".";

export class HealAction {
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

export class HealAnotherAction {
  readonly source: Healer;
  readonly target: HealTarget;
  #alliances: AllianceInformer;

  constructor(source: Healer, target: HealTarget, alliances: AllianceInformer) {
    this.source = source;
    this.target = target;
    this.#alliances = alliances;
  }

  run() {
    if (!this.source.isAlive) {
      throw new Error("Dead characters cannot heal");
    }

    if (!this.target.isAlive) {
      throw new Error("Invalid heal target (cannot heal dead characters)");
    }

    if (!this.#alliances.areAllies(this.source, this.target)) {
      throw new Error("Invalid heal target (can only heal allies)");
    }

    this.target.health += this.source.healing;
  }
}
