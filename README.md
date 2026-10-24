# Pet Hunter

**Pet Hunter** is a fantasy creature-discovery, hunting, taming, hatching, breeding, and raising game being developed as a **mobile-first web application**. Players explore a living world through branching text adventures, encounter creatures, gather resources, improve their hunter's skills, and care for creatures at their sanctuary. Creature combat and multiplayer systems are longer-term possibilities.

**Playable prototype:** https://queenbee-creator-tech.github.io/Pet-Hunter/

## Project status

**Early development / alpha prototype.** The current prototype is a small technical foundation, **not** a complete implementation of the gameplay design below. Many mechanics are approved as design directions but still need implementation, balancing, and testing. Species, recipes, exact durations, and much of the worldbuilding remain provisional.

## Player experience and gameplay loop

1. **Start in Autumn.** Every player begins with a sanctuary in the **Autumn Civilization**.
2. **Prepare at the sanctuary.** Care for creatures, manage resources and inventory, and prepare for expeditions.
3. **Explore through text choices.** Travel through a consistent fantasy world while narrative choices introduce discoveries, obstacles, resources, and creature encounters.
4. **Encounter and decide.** Observe, pursue, tame or acquire creatures when appropriate, gather materials, or move on. Outcomes depend on the game's rules and the player's situation.
5. **Return, recover, and progress.** Raise and train creatures, recover resources, develop hunter skills, craft equipment, and unlock further opportunities.
6. **Explore again.** New skills, preparation, and changing world conditions create different possibilities.

The goal is a **living world with stable geography**: the locations and their geographic connections remain consistent, while creatures, weather, events, and narrative obstacles can change. The branching text interface is **not** a randomly rearranged map.

## World, travel, and sanctuary

- The world is organized around **seasonal civilizations/biomes**. All players begin in **Autumn**; players do not choose a different starting biome.
- Traveling to other biomes depends on relevant **skills, equipment, resources, and conditions**. Exact requirements are not finalized.
- **Travel and relocation are different systems.** Moving the player's sanctuary to another biome requires both sufficient in-game money and the ability to meet that biome's survival/habitation requirements.
- The sanctuary is the player's home base for creature care, preparation, and recovery.
- The prototype uses **home-only stamina recovery** at +2 stamina per five real-world minutes, including elapsed time away from the app while the hunter is home. Current stamina values are prototype balancing choices, not final numbers.

## Creature encounters and the smart stone

- Creatures spawn in the world and behave within its environment. Text-adventure circumstances can lead the player to a creature at a particular location.
- **Each encountered creature gets a return window beginning at the encounter**, whether the player attempts to tame it, cannot tame it, or chooses to leave. The window applies regardless of rarity or species and **does not require a marker**.
- During that window, the player can return to the **same encounter location** and find that creature. **15 minutes is an example, not a finalized duration.**
- A **smart/tracking stone** is an early craftable, **indefinitely reusable** navigation tool. The player crafts it once after gathering the needed materials; an advanced crafting-level requirement is not planned.
- A marked encounter can be retraced using **yellow-highlighted text choices** that lead toward the recorded location. The stone does not teleport the player, capture the creature, or extend its encounter window.
- When the encounter window ends, the yellow guidance disappears, the mark deactivates, and the stone becomes available for reuse. The creature is no longer guaranteed at that exact spot; it is **not deleted from the world**.
- The working design uses **one active mark at a time**. The precise recipe, interface, and final encounter duration remain to be determined.

## Skills and progression

- Exploration activities can develop hunter skills, such as climbing.
- Repeating **the exact same challenge at the same location** gives diminishing skill experience until it awards **zero**. A genuinely different challenge can provide fresh experience.
- Skill progression can help unlock routes, overcome hazards, and support travel to more demanding environments.
- Exact experience formulas, thresholds, and skill trees remain open for design and testing.

## Creatures and longer-term scope

- The current rarity color scheme is **Common (white), Rare (blue), Epic (purple), and Legendary (gold)**. Creature rarity and mutation rarity are separate concepts.
- Creatures may be discovered, tamed, acquired as eggs/offspring where appropriate, hatched, raised, trained, and eventually used in combat.
- Species rosters, genetics, mutation probabilities, growth balancing, and combat rules are still in development. Earlier roster counts and biome themes should not be treated as locked requirements.
- Future multiplayer creature battles and contested bounty encounters are **not part of the initial playable slice**.

## Technical direction

- **Mobile-first web app**, also usable on desktop.
- **Game engine separate from the interface** so rules can be tested independently.
- **Branching text-adventure exploration** with a later visual sanctuary and character/skills screens.
- Persistent save/resume behavior.
- The game engine determines valid actions, costs, and outcomes. An AI narrator, if used, may describe events but **must not override gameplay rules or invent rewards**.
- Build and test a small, enjoyable gameplay loop before expanding the world or graphics.

## Repository documentation

- [Gameplay loop and world simulation](docs/GAMEPLAY_LOOP_AND_WORLD_SIMULATION.md)
- [Development checklists](docs/DEVELOPMENT_CHECKLISTS.md)
- [World and biomes](world/BIOMES.md)
- [Creature system](creatures/CREATURE_SYSTEM.md)
- [Species template](creatures/SPECIES_TEMPLATE.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Development roadmap](docs/ROADMAP.md)

**Documentation note:** Some older documents and prototype screens may still describe superseded ideas (such as choosing a starting biome). The newer approved gameplay decisions take precedence until those files and the prototype are updated.
