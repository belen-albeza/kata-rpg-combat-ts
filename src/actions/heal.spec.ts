import { describe, it, expect } from "bun:test";
import Character from "../character";
import HealAction from "./heal";

describe("Character healing", () => {
  it("Heals themselves", () => {
    const source = new Character({ health: 100, healing: 50 });
    const heal = new HealAction(source);

    heal.run();

    expect(source.health).toBe(150);
  });

  it("Throws exception if the healer is dead", () => {
    const source = new Character({ healing: 50, health: 0 });
    const heal = new HealAction(source);

    expect(() => {
      heal.run();
    }).toThrow(/dead characters cannot heal/i);
  });
});
