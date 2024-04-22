export { default as HealAction } from "./heal";

interface HasHealth {
  health: number;
  isAlive: boolean;
}
export interface Healer extends HasHealth {
  healing: number;
}
