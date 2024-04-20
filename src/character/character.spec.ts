import { describe, it, expect } from "bun:test";
import Character from "./character";

describe("Character", () => {
  it("Gets created with 1000 health points by default", () => {
    const c = new Character();
    expect(c.health).toBe(1000);
  });

  it("Gets created with the specified options", () => {
    const c = new Character({ health: 123 });
    expect(c.health).toBe(123);
  });

  describe("Health", () => {
    it("Cannot be above 1000 health points", () => {
      const c = new Character();
      c.health = 2000;
      expect(c.health).toBe(1000);
    });

    it("Cannot be belove 0 health points", () => {
      const c = new Character();
      c.health = -100;
      expect(c.health).toBe(0);
    });
  });

  describe("Death", () => {
    it("Returns whether they are dead or alive", () => {
      const alive = new Character({ health: 1 });
      const dead = new Character({ health: 0 });

      expect(alive.isAlive).toBeTrue();
      expect(dead.isAlive).toBeFalse();
    });
  });
});

describe("Character attack", () => {
  it("Deals damage to another character", () => {
    const c = new Character({ damage: 50 });
    const other = new Character({ health: 1000 });

    c.attack(other);

    expect(other.health).toBe(950);
  });

  it("Throws exception if the attacker is dead", () => {
    const c = new Character({ damage: 50, health: 0 });
    const other = new Character({ health: 1000 });

    expect(() => {
      c.attack(other);
    }).toThrow(/dead characters cannot attack/i);
  });
});

describe("Character healing", () => {
  it("Heals themselves", () => {
    const c = new Character({ health: 100, healing: 50 });

    c.heal();

    expect(c.health).toBe(150);
  });

  it("Throws exception if the healer is dead", () => {
    const c = new Character({ healing: 50, health: 0 });

    expect(() => {
      c.heal();
    }).toThrow(/dead characters cannot heal/i);
  });
});
