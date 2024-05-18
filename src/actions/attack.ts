import { Attacker, AttackTarget, AllianceInformer } from ".";

export default class AttackAction {
  readonly source: Attacker;
  readonly target: AttackTarget;
  readonly #alliances?: AllianceInformer;

  constructor(
    source: Attacker,
    target: AttackTarget,
    alliances?: AllianceInformer
  ) {
    this.source = source;
    this.target = target;
    this.#alliances = alliances;
  }

  run() {
    if (!this.source.isAlive) {
      throw new Error("Dead characters cannot attack");
    }

    if (this.source === this.target) {
      throw new Error(
        "Invalid attack target: Characters cannot attack themselves"
      );
    }

    if (this.#alliances?.areAllies(this.source, this.target)) {
      throw new Error("Invalid attack target: cannot attack allies");
    }

    const distance = this.source.position.distanceTo(this.target.position);
    const isWithinRange = distance <= this.source.range;
    if (!isWithinRange) {
      throw new Error("Invalid attack target: Out of range");
    }

    this.target.health -= this.#damage;
  }

  get #damage() {
    const diff = this.source.level - this.target.level;
    const coeff = diff >= 5 ? 1.5 : diff <= -5 ? 0.5 : 1.0;

    return this.source.damage * coeff;
  }
}
