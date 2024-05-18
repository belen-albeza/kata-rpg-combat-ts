# RPG Combat kata

_This is an adaptation of the kata created by Daniel Ojeda, which was originally in a slide deck (you can find it at https://www.slideshare.net/DanielOjedaLoisel/rpg-combat-kata). The content is mostly the same, but some changes have been made to the text to eliminate ambiguity._

## Instructions

This kata replicates a RPG combat system. Characters will not be moving around in a map, etc.

This kata is structured in iterations (steps). New requirements are added in each one. It is best if you don't look ahead to learn what's coming next, at least for the first time you try.

## Iterations

### 🚀 Iteration 1: Characters and basic actions

- **Characters** have **Health**, starting at `1000` health points.

  - Health cannot be dropped below zero. If this happens, health is set to `0` and the character dies.
  - Health cannot go above `1000` health points.

- Characters can perform these **actions**:

  - Deal damage to another character.
  - Heal themselves.

- Characters can be dead or alive. A character with `0` health is considered dead.
  - Dead characters cannot perform actions.

### 🚀 Iteration 2: Levels and attack targets

- A Character cannot target themselves for attacking.

- Characters have a **Level**, starting at 1.
  - If the target is 5+ levels _above_ the attacker, the attack will have a **debuff** of `-50%` to the damage.
  - If the target is 5+ levels _below_ the attacker, the attack will have a **buff** of `+50%` to the damage.

### 🚀 Iteration 3: Attack range

- Characters have an attack range.

  - If they are a **Melee figther**, their range would be `2` meters.
  - If they are a **Ranged figther**, their range would be `20` meters.

- When dealing damage in an attack, the target must be within range.

### 🤔 Reflection #1

_This is not an iteration, but rather a moment for you to take a short break, reflect, and do any refactors if you deem them necessary_.

- Are you keeping up with the requirements?

- Do you feel good about your design? Is it scalable and easily adapted to the requirements that have been added?

- Is your code tested? If so, are you confident in your tests?

- Take a look at the next iteration: do you want to make some changes in your design before you tackle that?

### 🚀 Iteration 4: Factions

- We now have **Factions**.

- A Character may join or leave one or more factions.

- Characters that belong to the same faction are considered **allies**.
  - Characters can heal themselves, _and_ allies.
  - Characters cannot attack allies.

### 🚀 Iteration 5: Non-character targets (props)

- Characters can damage **Props** (a tree, a house, etc.). Any entity with **Health** that is not a Character, is a prop.

- Props cannot heal or be healed.

- Props cannot deal damage.

- Props do not belong to any faction, they are neutral.
