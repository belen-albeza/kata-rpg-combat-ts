import { describe, it, expect } from "bun:test";
import { HealAction, HealAnotherAction } from "./heal";

const anyHealer = ({ health = 1000, healing = 1 } = {}) => {
  return { health, healing, isAlive: health > 0 };
};

const anyTarget = ({ health = 1000 } = {}) => {
  return { health, isAlive: health > 0 };
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

describe("HealAnother action", () => {
  it("Healers can heal an ally", () => {
    const source = anyHealer({ health: 100, healing: 50 });
    const target = anyTarget({ health: 100 });
    const informerOfAlliance = { areAllies: () => true };
    const heal = new HealAnotherAction(source, target, informerOfAlliance);

    heal.run();

    expect(target.health).toBe(150);
  });

  it("Throws exception if the target is not an ally", () => {
    const source = anyHealer({ health: 100, healing: 50 });
    const target = anyTarget({ health: 100 });
    const informerOfNoAlliance = { areAllies: () => false };
    const heal = new HealAnotherAction(source, target, informerOfNoAlliance);

    expect(() => {
      heal.run();
    }).toThrow(/invalid heal target/i);
  });

  it("Throws exception if the healer is dead", () => {
    const source = anyHealer({ healing: 50, health: 0 });
    const target = anyTarget();
    const informerOfAlliance = { areAllies: () => true };
    const heal = new HealAnotherAction(source, target, informerOfAlliance);

    expect(() => {
      heal.run();
    }).toThrow(/dead characters cannot heal/i);
  });

  it("Throws exception if the target is dead", () => {
    const source = anyHealer({ healing: 50, health: 100 });
    const target = anyTarget({ health: 0 });
    const informerOfAlliance = { areAllies: () => true };
    const heal = new HealAnotherAction(source, target, informerOfAlliance);

    expect(() => {
      heal.run();
    }).toThrow(/invalid heal target/i);
  });
});
