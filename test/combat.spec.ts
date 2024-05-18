import { describe, it, expect } from "bun:test";

import Character from "../src/character";
import { AttackAction, HealAction, HealAnotherAction } from "../src/actions";
import FactionManager from "../src/factions";
import Prop from "../src/prop";

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

describe("Factions", () => {
  it("Characters can join and leave a faction", () => {
    const factions = new FactionManager();
    const orc = new Character();

    factions.join("horde", orc);
    expect(factions.members("horde")?.has(orc)).toBeTrue();

    factions.leave("horde", orc);
    expect(factions.members("horde")?.has(orc)).toBeFalse();
  });

  it("Characters can heal an ally", () => {
    const healer = new Character({ healing: 50 });
    const target = new Character({ health: 50 });
    const factions = new FactionManager();
    factions.join("foo", healer);
    factions.join("foo", target);

    new HealAnotherAction(healer, target, factions).run();

    expect(target.health).toBe(100);
  });

  it("Disallows characters to attack allies", () => {
    const attacker = new Character({ damage: 100 });
    const target = new Character();
    const factions = new FactionManager();
    factions.join("foo", attacker);
    factions.join("foo", target);
    const attack = new AttackAction(attacker, target, factions);

    expect(() => {
      attack.run();
    }).toThrow(/invalid attack target/i);
  });
});

describe("Props", () => {
  it("Cannot join factions", () => {
    const house = new Prop();
    const factions = new FactionManager();

    expect(() => {
      factions.join("foo", house);
    }).toThrow(/invalid member/i);
  });

  it("Can be damaged by characters", () => {
    const house = new Prop({ health: 1000 });
    const attacker = new Character({ damage: 100 });

    new AttackAction(attacker, house).run();

    expect(house.health).toBe(900);
  });
});
