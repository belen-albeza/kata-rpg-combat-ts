import { describe, it, expect } from "bun:test";
import Vec2d from "./vec2d";

describe("Vec2d", () => {
  it("Gets created at 0,0 by default", () => {
    const v = new Vec2d();
    expect(v.x).toBe(0);
    expect(v.y).toBe(0);
  });

  it("Gets created at the provided coordinates", () => {
    const v = new Vec2d(1, 2);
    expect(v.x).toBe(1);
    expect(v.y).toBe(2);
  });

  it("Returns the distance between two positions", () => {
    const v = new Vec2d(0, 0);
    const u = new Vec2d(2, 2);
    expect(v.distanceTo(u)).toBeCloseTo(2.828427);
  });
});
