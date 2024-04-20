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
});
