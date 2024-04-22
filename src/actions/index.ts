import Vec2d from "../utils/vec2d";

export { default as HealAction } from "./heal";
export { default as AttackAction } from "./attack";

interface HasHealth {
  health: number;
  isAlive: boolean;
}

interface HasLevel {
  level: number;
}

interface HasPosition {
  position: Vec2d;
}

export interface Healer extends HasHealth {
  healing: number;
}

export interface Attacker extends HasHealth, HasLevel, HasPosition {
  damage: number;
  range: number;
}

export interface AttackTarget extends HasHealth, HasLevel, HasPosition {}
