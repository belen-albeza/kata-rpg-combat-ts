import Vec2d from "../utils/vec2d";
import { AttackTarget } from "../actions";
import { Neutral } from "../factions";

interface PropOptions {
  health?: number;
  position?: Vec2d;
}

export default class Prop implements AttackTarget, Neutral {
  #health: number;
  readonly position: Vec2d;
  readonly isNeutral = true;

  constructor({ health = 1000, position = new Vec2d() }: PropOptions = {}) {
    this.#health = health;
    this.position = position;
  }

  get level() {
    return 1;
  }

  get isAlive() {
    return this.health > 0;
  }

  get health() {
    return this.#health;
  }

  set health(value: number) {
    this.#health = Math.max(0, value);
  }
}
