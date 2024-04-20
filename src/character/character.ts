interface CharacterOptions {
  health?: number;
  damage?: number;
  healing?: number;
  level?: number;
}

export default class Character {
  #health: number;
  readonly level: number;
  #stats: { damage: number; healing: number };

  constructor(options: CharacterOptions = {}) {
    const defaults = {
      health: 1000,
      damage: 0,
      healing: 0,
      level: 1,
    };

    const { health, damage, healing, level } = { ...defaults, ...options };

    this.#health = health;
    this.level = level;
    this.#stats = {
      damage,
      healing,
    };
  }

  toString() {
    return `Lvl. ${this.level} (HP: ${this.health})`;
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

    other.health -= this.damage;
  }
}
