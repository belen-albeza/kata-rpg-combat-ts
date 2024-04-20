# RPG Combat kata

_This is an adaptation of the kata created by Daniel Ojeda, which was originally in a slide deck (you can find it at https://www.slideshare.net/DanielOjedaLoisel/rpg-combat-kata). The content is mostly the same, but some changes have been made to the text to eliminate ambiguity._ 

## Instructions

This kata replicates a RPG combat system. Characters will not be moving around in a map, etc. 

Each step is meant to do one after the other. It is best if you don't look up what's coming next, at least for the first time you try.

## Iteration 1: Characters and basic actions

- Characters have Health, starting at `1000` health points.
  - Health cannot be dropped below zero. If this happens, health is set to `0` and the character dies.
  - Health cannot go above `1000` health points.

- Characters can perform these **actions**:
  - Deal damage to another character.
  - Heal themselves.

- Characters can be dead or alive. A character with `0` health is considered dead.
  - Dead characters cannot perform actions.

