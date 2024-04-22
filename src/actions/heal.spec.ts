import { describe, it, expect } from "bun:test";
import HealAction from "./heal";

const anyHealer = ({ health = 1000, healing = 1 } = {}) => {
  return { health, healing, isAlive: health > 0 };
};

describe("Heal action", () => {
  it("Healers heal themselves", () => {
    const source = anyHealer({ health: 100, healing: 50 });
    const heal = new HealAction(source);

    heal.run();

    expect(source.health).toBe(150);
  });

  it("Throws exception if the healer is dead", () => {
    const source = anyHealer({ healing: 50, health: 0 });
    const heal = new HealAction(source);

    expect(() => {
      heal.run();
    }).toThrow(/dead characters cannot heal/i);
  });
});
