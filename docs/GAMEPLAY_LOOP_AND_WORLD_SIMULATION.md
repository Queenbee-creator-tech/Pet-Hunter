# Pet Hunter — Gameplay Loop & World Simulation

Status: WORKING DESIGN, NOT CANON

## Design direction
Pet Hunter is a **mobile-first web application** with a game engine separate from its presentation. Define the gameplay loop and world/creature interaction before extensive creature and biome design.

## Proposed core loop (to validate)
1. Explore: select a destination, investigate clues, navigate.
2. Encounter: engine selects or simulates a plausible creature, discovery, hazard or event.
3. Decide and act: track, observe, approach, fight, tame, gather, acquire an egg, retreat.
4. Resolve: authoritative engine checks skill, state, rules, costs, randomness and consequences.
5. Return and progress: care for creatures, prepare habitats, incubate eggs, research, improve skills and equipment.
6. Repeat: progression unlocks new options and challenges.

## Architecture concept
- **World metadata:** biomes, regions, climates, habitats, resources, routes, constraints and world lore.
- **Creature metadata:** species, ecology, diet, behavior, rarity, genetics, growth, interactions and habitat needs.
- **Persistent state:** player skills, location, inventory, nests/eggs, creatures, health, time, constructed habitats, progress and important world changes.
- **Simulation/rules engine:** authoritative state transitions, valid actions, encounters, probability rolls and outcomes.
- **AI narrator:** produces varied descriptions, story beats and dialogue based on engine-approved facts and constraints; cannot invent rewards or override rules.
- **Caching/hybrid content:** cache reusable locations, encounters and descriptions; selectively generate variations to control latency/cost and maintain consistency.
- **Mobile-first web UI:** touch-friendly text/story interface and choices; responsive on desktop; future visual upgrades can reuse the engine.

## Initial vertical slice proposal
One compact location, a few species, one expedition, one encounter with consequential choices, egg acquisition, return home, habitat preparation and hatch/raise flow. Test before expanding.

## Open design questions
1. What does the player do minute-to-minute: location choices, free text, map navigation, or hybrid?
2. How does game time advance and affect the simulation?
3. What autonomy do wild creatures have (roam, nest, hunt, flee, recover)?
4. What are the main progression paths?
5. What does failure cost?
6. What world events persist and for how long?
7. What content is deterministic/cached vs generated live?
8. What is the smallest enjoyable playable loop?

## Related notes
- docs/ARCHITECTURE.md
- docs/BRAINSTORM_CROSS_BIOME_RAISING.md
- docs/BRAINSTORM_LEGENDARY_BREEDING.md
