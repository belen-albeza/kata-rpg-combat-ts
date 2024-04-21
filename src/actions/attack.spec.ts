import { describe, it, expect } from "bun:test";
import Character, { Vec2d } from "../character";
import AttackAction from "./attack";

describe("Character attack", () => {
  it("Deals damage to another character", () => {
    const source = new Character({ damage: 50 });
    const target = new Character({ health: 1000 });
    const attack = new AttackAction(source, target);

    attack.run();

    expect(target.health).toBe(950);
  });

  it("Throws exception if the attacker is dead", () => {
    const source = new Character({ damage: 50, health: 0 });
    const target = new Character({ health: 1000 });
    const attack = new AttackAction(source, target);

    expect(() => {
      attack.run();
    }).toThrow(/dead characters cannot attack/i);
  });

  it("Throws exception is the attacker targets themselves", () => {
    const source = new Character({ damage: 50, health: 1000 });
    const attack = new AttackAction(source, source);

    expect(() => {
      attack.run();
    }).toThrow(/invalid attack target/i);
  });

  it("Gets a +50% buff if target is 5+ levels below", () => {
    const source = new Character({ damage: 100, level: 6 });
    const target = new Character({ health: 1000, level: 1 });
    const attack = new AttackAction(source, target);

    attack.run();

    expect(target.health).toBe(850);
  });

  it("Gets a -50% debuff if target is 5+ levels above", () => {
    const source = new Character({ damage: 100, level: 1 });
    const target = new Character({ health: 1000, level: 6 });
    const attack = new AttackAction(source, target);

    attack.run();

    expect(target.health).toBe(950);
  });

  it("Throws exception if the target is out of range", () => {
    const source = new Character({
      damage: 100,
      attackType: "ranged",
      position: new Vec2d(0, 0),
    });
    const target = new Character({ health: 1000, position: new Vec2d(21, 0) });
    const attack = new AttackAction(source, target);

    expect(() => {
      attack.run();
    }).toThrow(/out of range/i);
  });
});
