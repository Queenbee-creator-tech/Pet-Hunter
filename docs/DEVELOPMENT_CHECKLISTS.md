# Pet Hunter — Development Checklists

These are planning checklists, not claims that work is completed. Check off items after verifying them. Keep design decisions separate from implementation and testing.

## Brainstorming & Ideas

- [ ] Capture new game ideas
- [ ] Evaluate whether each idea fits Pet Hunter
- [ ] Identify which game systems the idea affects
- [ ] Decide whether to approve, postpone, or reject the idea
- [ ] Transfer approved decisions to the appropriate thread and GitHub

## Gameplay Loop & World Simulation

- [ ] Define the player's first five minutes
- [ ] Define the core repeatable gameplay loop
- [ ] Design player actions and choices
- [ ] Define world and creature interactions
- [ ] Define time, weather, and environmental effects
- [ ] Define progression, rewards, and failure consequences
- [ ] Plan the first playable gameplay prototype
- [ ] Playtest the loop and refine it

## Worldbuilding: Biomes & Lore

- [ ] Establish the world's overall structure
- [ ] Define each biome and its environment
- [ ] Design geography, routes, and travel
- [ ] Define environmental hazards and resources
- [ ] Establish lore and world consistency rules
- [ ] Create world metadata templates
- [ ] Document the first playable region

## Creature Development: Species & Genetics

- [ ] Finalize rarity and tier definitions
- [ ] Create the species metadata template
- [ ] Define creature behaviors and ecology
- [ ] Design acquisition, taming, and egg collection
- [ ] Define growth stages and care requirements
- [ ] Design breeding, genetics, and mutations
- [ ] Define creature abilities and progression
- [ ] Create and test the first prototype species

## Game Engine: Mechanics & Development

- [ ] Define the engine and UI boundaries
- [ ] Design persistent game state and save data
- [ ] Implement world and creature metadata loading
- [ ] Implement valid actions and outcome resolution
- [ ] Implement encounter and creature behavior logic
- [ ] Implement breeding and incubation rules
- [ ] Design AI narration constraints and caching
- [ ] Build the mobile-first web interface
- [ ] Test exploits, save consistency, and performance
- [ ] Deploy a playable web prototype


## Sunday October 25, 2026 — Autumn playable alpha deadline

**Deadline contract:** A playable Autumn experience must include AI-driven exploration, real Autumn species with stats and approved modular mutations, acquisition, incubation, raising/care, breeding/inheritance, and locked non-Autumn biomes. These are **required for Sunday**, not postponed polish. Do not silently substitute placeholder species or static narration for the required features.

**Status convention:** All boxes below start unchecked until the feature is implemented and verified in the deployed build. Existing prototypes and tests are foundations, not proof of end-to-end completion.

### World and AI exploration
- [ ] Autumn is the only playable biome
- [ ] Spring, Summer, and Winter appear locked and are inaccessible in the engine
- [ ] AI generates varied Autumn adventures, choices, and encounters
- [ ] AI follows approved Autumn geography, lore, and metadata
- [ ] Engine, not AI, authorizes choices, costs, probabilities, rewards, and outcomes

### Autumn species and genetics
- [ ] Agree and define the complete Sunday Autumn species roster (count remains to be confirmed; 12 is a proposal, not approval)
- [ ] Define each species' appearance, habitats, and behavior
- [ ] Implement species-specific stats and Common/Rare/Epic/Legendary rarity tiers
- [ ] Define approved modular mutation traits, compatibility, and inheritance
- [ ] Spawn real Autumn species in encounters and award correctly typed creatures or eggs

### Incubation, breeding, and raising
- [ ] Hatching preserves the correct species, rarity, stats, and inherited traits
- [ ] Breeding checks eligibility, species compatibility, and applicable hunter skills
- [ ] Engine-controlled breeding and mutation outcomes use configured probabilities
- [ ] Inventory and saves preserve individual creature stats, rarity, and mutations
- [ ] Autumn creatures have working care/raising interactions

### Release verification
- [ ] Complete the explore → encounter → acquire → return → hatch/care → breed loop
- [ ] Test AI narrator for rule violations, fabricated rewards, and consistency
- [ ] Test breeding, mutations, stat persistence, cooldowns, and reloads
- [ ] Test mobile layout, browser save/resume, and locked-biome restrictions
- [ ] Deploy Sunday build and playtest it end-to-end on a phone

### Scope and risks
- AI integration requires a server-side key/proxy; do not put API secrets in browser code.
- Prototype files exist for exploration, incubation, breeding, and saves; they still contain placeholder species and provisional balance.
- No unapproved species, mutation visuals, or hybrid forms may be invented by the engine or narrator.
- Avoid adding combat, multiplayer, additional playable biomes, or visual polish before this deadline.
- If a requirement is blocked, report it explicitly rather than reclassifying it as optional.
