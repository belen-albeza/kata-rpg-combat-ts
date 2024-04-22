import { describe, it, expect } from "bun:test";

import Character from "../src/character";
import { AttackAction, HealAction } from "../src/actions";

describe("Character combat", () => {
  it("Allows characters to attack one another", () => {
    const attacker = new Character({ damage: 100 });
    const target = new Character({ health: 1000 });

    new AttackAction(attacker, target).run();

    expect(target.health).toBe(900);
  });

  it("Allows characters to heal themselves", () => {
    const healer = new Character({ health: 900, healing: 50 });

    new HealAction(healer).run();

    expect(healer.health).toBe(950);
  });
});
