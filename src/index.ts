import { AttackAction } from "./actions";
import { HealAnotherAction } from "./actions";
import Character from "./character";
import FactionManager from "./factions";

const orc = new Character({ damage: 100, healing: 10 });
const elf = new Character({ damage: 50, healing: 80 });
const human = new Character({ damage: 50, healing: 100 });
const factions = new FactionManager();

factions.join("Alliance", elf);
factions.join("Alliance", human);

console.log("RPG Combat");

console.log(`\tGarrosh: ${orc}`);
console.log(`\tMalfurion: ${elf}`);
console.log(`\tAnduin: ${elf}`);

new AttackAction(orc, elf).run();

console.log("Garrosh attacks Malfurion!");
console.log(`\tGarrosh: ${orc}`);
console.log(`\tMalfurion: ${elf}`);
console.log(`\tAnduin: ${human}`);

new HealAnotherAction(human, elf, factions).run();

console.log("Anduin heals Malfurion!");
console.log(`\tGarrosh: ${orc}`);
console.log(`\tMalfurion: ${elf}`);
console.log(`\tAnduin: ${human}`);
