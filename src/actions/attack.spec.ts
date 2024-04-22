import { describe, it, expect } from "bun:test";
import Vec2d from "../utils/vec2d";

import AttackAction from "./attack";

const anyAttacker = ({
  health = 1000,
  damage = 1,
  level = 1,
  range = 0,
  position = new Vec2d(),
} = {}) => {
  return { damage, level, range, position, isAlive: health > 0, health };
};

const anyTarget = ({
  health = 1000,
  level = 1,
  position = new Vec2d(),
} = {}) => {
  return { health, isAlive: health > 0, level, position };
};

describe("Character attack", () => {
  it("Deals damage to another character", () => {
    const source = anyAttacker({ damage: 50 });
    const target = anyTarget({ health: 1000 });
    const attack = new AttackAction(source, target);

    attack.run();

    expect(target.health).toBe(950);
  });

  it("Throws exception if the attacker is dead", () => {
    const source = anyAttacker({ damage: 50, health: 0 });
    const target = anyTarget({ health: 1000 });
    const attack = new AttackAction(source, target);

    expect(() => {
      attack.run();
    }).toThrow(/dead characters cannot attack/i);
  });

  it("Throws exception is the attacker targets themselves", () => {
    const source = anyAttacker({ damage: 50, health: 1000 });
    const attack = new AttackAction(source, source);

    expect(() => {
      attack.run();
    }).toThrow(/invalid attack target/i);
  });

  it("Gets a +50% buff if target is 5+ levels below", () => {
    const source = anyAttacker({ damage: 100, level: 6 });
    const target = anyTarget({ health: 1000, level: 1 });
    const attack = new AttackAction(source, target);

    attack.run();

    expect(target.health).toBe(850);
  });

  it("Gets a -50% debuff if target is 5+ levels above", () => {
    const source = anyAttacker({ damage: 100, level: 1 });
    const target = anyTarget({ health: 1000, level: 6 });
    const attack = new AttackAction(source, target);

    attack.run();

    expect(target.health).toBe(950);
  });

  it("Throws exception if the target is out of range", () => {
    const source = anyAttacker({ range: 1, position: new Vec2d(0, 0) });
    const target = anyTarget({ position: new Vec2d(2, 0) });
    const attack = new AttackAction(source, target);

    expect(() => {
      attack.run();
    }).toThrow(/out of range/i);
  });
});
