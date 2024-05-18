import { describe, it, expect } from "bun:test";
import Prop from "./prop";

describe("Prop", () => {
  it("Has health", () => {
    const p = new Prop({ health: 1000 });
    expect(p.health).toBe(1000);
  });

  it("Has level 1", () => {
    const p = new Prop();
    expect(p.level).toBe(1);
  });
});
