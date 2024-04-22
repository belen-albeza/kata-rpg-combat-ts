import Vec2d from "../utils/vec2d";
import { Healer } from "../actions";

export interface CharacterOptions {
  health?: number;
  damage?: number;
  healing?: number;
  level?: number;
  attackType?: AttackType;
  position?: Vec2d;
}

export type AttackType = "melee" | "ranged";

export default class Character implements Healer {
  #health: number;
  position: Vec2d;
  #stats: {
    damage: number;
    healing: number;
    level: number;
    attackType: AttackType;
  };

  constructor(options: CharacterOptions = {}) {
    const defaults = {
      health: 1000,
      damage: 0,
      healing: 0,
      level: 1,
      attackType: "melee" as AttackType,
      position: new Vec2d(),
    };

    const { health, damage, healing, level, attackType, position } = {
      ...defaults,
      ...options,
    };

    this.#health = health;
    this.position = position;
    this.#stats = {
      damage,
      healing,
      level,
      attackType,
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

  get level() {
    return this.#stats.level;
  }

  get attackType() {
    return this.#stats.attackType;
  }

  get range() {
    return this.attackType === "melee" ? 2 : 20;
  }
}
