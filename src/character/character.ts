interface CharacterOptions {
  health?: number;
}

export default class Character {
  #health: number = 1000;

  constructor(options: CharacterOptions = {}) {
    const defaults = {
      health: 1000,
    };

    const { health } = { ...defaults, ...options };

    this.#health = health;
  }

  get health() {
    return this.#health;
  }

  set health(value: number) {
    this.#health = Math.max(0, Math.min(value, 1000));
  }
}
