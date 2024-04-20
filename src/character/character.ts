export interface CharacterOptions {
  health?: number;
  damage?: number;
  healing?: number;
  level?: number;
  attackType?: AttackType;
  position?: Vec2d;
}

export type AttackType = "melee" | "ranged";
export type Vec2d = { x: number; y: number };

export default class Character {
  #health: number;
  readonly level: number;
  readonly attackType: AttackType;
  position: Vec2d;
  #stats: { damage: number; healing: number };

  constructor(options: CharacterOptions = {}) {
    const defaults = {
      health: 1000,
      damage: 0,
      healing: 0,
      level: 1,
      attackType: "melee" as AttackType,
      position: { x: 0, y: 0 } as Vec2d,
    };

    const { health, damage, healing, level, attackType, position } = {
      ...defaults,
      ...options,
    };

    this.#health = health;
    this.level = level;
    this.attackType = attackType;
    this.position = position;
    this.#stats = {
      damage,
      healing,
    };
  }

  toString() {
    return `Lvl. ${this.level} ${this.attackType} fighter (HP: ${this.health})`;
  }

  get health() {
    return this.#health;
  }

  set health(value: number) {
    this.#health = Math.max(0, Math.min(value, 1000));
  }

  get isAlive() {
    return this.#health > 0;
  }

  get damage() {
    return this.#stats.damage;
  }

  get healing() {
    return this.#stats.healing;
  }

  get range() {
    return this.attackType === "melee" ? 2 : 20;
  }

  heal() {
    if (!this.isAlive) {
      throw new Error("Dead characters cannot heal");
    }

    this.health += this.healing;
  }

  attack(other: Character) {
    if (!this.isAlive) {
      throw new Error("Dead characters cannot attack");
    }

    if (this === other) {
      throw new Error(
        "Invalid attack target: Characters cannot attack themselves"
      );
    }

    const damage = this.#damageTo(other);
    other.health -= damage;
  }

  #damageTo(other: Character) {
    const diff = this.level - other.level;
    const coeff = diff >= 5 ? 1.5 : diff <= -5 ? 0.5 : 1.0;

    return this.damage * coeff;
  }
}
