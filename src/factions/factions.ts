import { Neutral } from ".";
export default class FactionManager {
  #factions: Map<string, Set<any>>;

  constructor(factions = new Map<string, Set<any>>()) {
    this.#factions = factions;
  }

  join(faction: string, member: any) {
    if (isNeutral(member)) {
      throw new Error("Invalid member: neutral entities cannot join factions");
    }

    const members = (this.#factions.get(faction) ?? new Set()).add(member);
    this.#factions.set(faction, members);
  }

  leave(faction: string, member: any) {
    this.#factions.get(faction)?.delete(member);
  }

  members(faction: string) {
    if (!this.#factions.has(faction)) {
      throw new Error("Faction does not exist");
    }

    return this.#factions.get(faction);
  }

  areAllies(member: any, other: any) {
    return [...this.#factions.values()].some(
      (faction) => faction.has(member) && faction.has(other)
    );
  }
}

function isNeutral(value: unknown): value is Neutral {
  return !!value && (value as Neutral).isNeutral;
}
