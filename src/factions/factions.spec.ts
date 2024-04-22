import { describe, it, expect } from "bun:test";
import FactionManager from "./factions";

describe("FactionManager", () => {
  it("Adds a member to a faction", () => {
    const fm = new FactionManager();

    fm.join("horde", "Garrosh");

    expect(fm.members("horde")).toEqual(new Set(["Garrosh"]));
  });

  it("Removes a member from a faction", () => {
    const fm = new FactionManager(
      new Map([["horde", new Set(["Garrosh", "Thrall"])]])
    );

    fm.leave("horde", "Garrosh");

    expect(fm.members("horde")).toEqual(new Set(["Thrall"]));
  });

  describe("Alliances", () => {
    it("Returns false when two members don't have a faction in common", () => {
      const fm = new FactionManager();
      fm.join("horde", "Garrosh");
      fm.join("alliance", "Anduin");

      expect(fm.areAllies("Garrosh", "Anduin")).toBeFalse();
    });

    it("Returns true when two members have at least a faction in common", () => {
      const fm = new FactionManager();
      fm.join("horde", "Garrosh");
      fm.join("horde", "Thrall");

      expect(fm.areAllies("Garrosh", "Thrall")).toBeTrue();
    });
  });
});
