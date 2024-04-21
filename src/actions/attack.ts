import Character from "../character";
export { default as Character } from "../character";

export default class AttackAction {
  readonly source: Character;
  readonly target: Character;

  constructor(source: Character, target: Character) {
    this.source = source;
    this.target = target;
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
