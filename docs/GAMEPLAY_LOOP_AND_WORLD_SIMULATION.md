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

## Approved future multiplayer bounty contest decision rules (2026-10-23)
This is an **approved design rule table**, not an implemented or playtested feature. It is future scope, not a prerequisite for the first playable prototype.

A contested bounty encounter lets eligible hunters choose **Fight** or **Yield / Avoid Confrontation** before a response deadline. Yielding means declining a fight, not necessarily abandoning the bounty entirely. No response means timeout. An opportunity to capture is never a guaranteed capture or reward.

| Hunter A | Hunter B | Resolution |
|---|---|---|
| Fight | Fight | Consensual creature battle begins; battle outcome determines first capture opportunity |
| Fight | Yield | Hunter A gets capture opportunity |
| Yield | Fight | Hunter B gets capture opportunity |
| Yield | No response | Hunter A gets capture opportunity after deadline |
| No response | Fight | Hunter B gets capture opportunity after deadline |
| Yield | Yield | Both withdraw from this contest; bounty remains open |
| No response | No response | Bounty remains open |

The table is symmetric: Fight/No response also advances the responding hunter, and No response/Yield advances the yielding hunter. No player is forced into PvP. The game engine, not the AI narrator, resolves contest outcomes.

**Still open:** timer duration; whether choices are private/simultaneous; handling 3+ contenders; disconnections and exploits; capture process after gaining priority; re-entry into open bounties; bounty eligibility and rewards. Do not mark prototype or testing checklist items complete for this design approval.
