import Character from "./character";

const orc = new Character({ damage: 100, healing: 10 });
const elf = new Character({ damage: 50, healing: 80 });

console.log("RPG Combat");

console.log(`\tGarrosh: ${orc}`);
console.log(`\tMalfurion: ${elf}`);

orc.attack(elf);

console.log("Garrosh attacks Malfurion!");
console.log(`\tGarrosh: ${orc}`);
console.log(`\tMalfurion: ${elf}`);

elf.heal();

console.log("Malfurion heals himself!");
console.log(`\tGarrosh: ${orc}`);
console.log(`\tMalfurion: ${elf}`);
