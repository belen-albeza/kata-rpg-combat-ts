import { describe, it, expect } from "bun:test";
import Character, { Vec2d } from ".";

describe("Character", () => {
  it("Gets created with 1000 health points by default", () => {
    const c = new Character();
    expect(c.health).toBe(1000);
  });

  it("Gets created with the specified options", () => {
    const c = new Character({
      health: 123,
      damage: 50,
      healing: 10,
      level: 5,
      attackType: "ranged",
      position: new Vec2d(1, 2),
    });
    expect(c.health).toBe(123);
    expect(c.damage).toBe(50);
    expect(c.healing).toBe(10);
    expect(c.level).toBe(5);
    expect(c.attackType).toBe("ranged");
    expect(c.position).toEqual(new Vec2d(1, 2));
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

  describe("Range", () => {
    it("Returns 2 if they are a melee fighter", () => {
      const c = new Character({ attackType: "melee" });
      expect(c.range).toBe(2);
    });

    it("Returns 20 if they are a ranged fighter", () => {
      const c = new Character({ attackType: "ranged" });
      expect(c.range).toBe(20);
    });
  });
});
