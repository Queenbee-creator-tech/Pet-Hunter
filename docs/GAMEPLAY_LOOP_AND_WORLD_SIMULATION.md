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


## Gameplay-loop decisions and working concepts (2026-10-23)

**Status:** Individual directions below were agreed in discussion; the overall gameplay loop, probabilities, exact rules, UI and implementation are **still in progress**. No playtesting or code implementation is implied.

### Character setup and home
- One-time, story-based character onboarding (not part of the repeating loop): name, Legacy/Aspiring Hunter background, seasonal home biome and sanctuary placement.
- Four seasonal biome concepts: Spring, Summer, Autumn, Winter. Summer has an ancient-coral aesthetic. Home biome can influence starting skills, but visiting other biomes does not automatically grant their starter skills.
- Sanctuary/home is a persistent hub for eggs, raising, breeding, crafting, creature care, training, habitat work and preparation. Exact mechanics remain open.

### Repeatable exploration flow
**Sanctuary -> choose seasonal biome -> interactive text-story exploration -> meaningful branching decisions -> plausible discovery/challenge/outcome -> optional reward attempt and consequences -> keep exploring or use separate Leave Exploration control -> sanctuary.**
- The exploration story is text-based; **no visible map required**. The engine nevertheless tracks place, routes, prior actions, discoveries and valid transitions. The AI narrator must honor this state.
- Narrative choices (e.g., follow scratches under a coral archway) influence eligible encounters and outcomes. Revisiting the same route must not guarantee the same species, reward, or ending. Chance provides variation **within plausible location/story constraints**, not arbitrary events or teleportation.
- Balance pacing: neither a reveal after every click nor ten empty travel questions. Meaningful choices, suspense and variable discovery timing; not a rigid fixed number of questions.
- Possible outcomes include creature encounters, eggs, materials, skill/knowledge opportunities, lore, danger, empty/failed searches and retreats. Not every outing yields a physical reward.
- Leave Exploration is a **separate bottom-screen interface control**, not an in-story decision. Player keeps all successfully collected items, discoveries and earned skill progress. Leaving ends an unfinished encounter; it does not bookmark that specific opportunity. Confirmation UI is a proposal, not finalized.

### Stamina: agreed behavioral distinction; numerical balancing still open
- **Hunter exploration narrative actions are free**: following routes, climbing, hiding, investigating, tracking, navigating, and skill-building actions do **not** consume hunter stamina.
- Hunter stamina is deducted for **physical reward-acquisition attempts/outcomes**, such as gathering materials, collecting eggs and attempting to capture wild creatures. Current **working example: 5 stamina per attempt**. A failed capture still costs stamina. Exact amounts and special cases to balance later.
- An expedition that yields skill progress but no collection/capture attempt can cost **zero hunter stamina**.
- At zero hunter stamina, players may still explore and improve skills through story actions but cannot make stamina-requiring reward attempts until recovery. **Do not force-return or forbid exploration solely because stamina is zero.**
- Hunter stamina recovers with a real-time timer; rate/capacity TBD. Sanctuary activities and PvP with other real players' creatures **do not cost hunter stamina**.
- Creature stamina is **separate**: PvP battles consume creature stamina. Proposed creature injury consequences: defeated creature incapacitated and sent to sanctuary medical recovery for about 5 minutes; damaged winner shorter recovery; dominant healthy winner no injury timer. Damage thresholds and exact timings remain working proposals.

### Encounter rarity, skills and knowledge
- **Any hunter, including a beginner, can potentially discover AND capture a legendary creature.** Beginner capture should be extraordinarily difficult, not categorically impossible; experience, informed decisions and appropriate skills substantially improve success.
- Legendary discovery stays extremely rare even for experts. Relevant Tracking/Creature Knowledge may improve odds with bounded bonuses; Creature Handling primarily improves decisions/success once encountered. **Discovery and capture use separate probability decisions.** No numeric odds approved.
- Library/Codex is a reference UI, not a global spoiler guide. Species information must be discovered or studied; player knowledge and relevant skills affect information available. Relevant book shortcuts during exploration; full library at sanctuary.
- Players know **which kinds of activities** improve skills, but not exact repetition counts/formulas. Selective qualifying narrative actions may accumulate practice XP, even when no item is collected or expedition fails; challenge novelty and proficiency can affect progress. Skills are **not exclusively outcome-based**. Exact skill catalog, thresholds and formulas deferred to dedicated design/engine discussions.
- Safeguard against trivial skill farming without charging stamina for ordinary narrative actions; details TBD.

### Multiplayer / bounty future scope
- PvP creature battles do not consume hunter stamina; creature stamina/injury consequences are separate.
- See approved contested-bounty Fight/Yield/timeout table above; not part of MVP.

### Possible future idea — thieves (NOT approved as a mechanic)
- Uncommon, **contextual narrative NPC thief encounters** (or opportunistic stealing creatures/organized groups), chosen only where consistent with biome, route and prior actions.
- Story clues and player choices may allow suspicion, avoidance, confrontation or recovering stolen property; encounters may instead be harmless or lead to other discoveries.
- Give meaningful counterplay, a reasonable recovery path, and consider protections for extremely valuable rewards such as legendary eggs. Avoid arbitrary unpreventable loss.
- Exact item risk, theft probabilities, recovery, NPC vs player scope and inclusion in MVP are **undecided**. Save solely as an idea for later evaluation.

### Open decisions / later work
- Detailed skill list and practice/XP formulas; encounter weights, legendary probability caps and capture odds; reward costs and regeneration; battle injuries; thief inclusion and balance; initial story pacing playtests; confirmation behavior for leaving active encounters; initial first-five-minutes prototype.
- Do not mark implementation/test checklist tasks complete merely because a design idea has been discussed.


## Clarification: sanctuary is a physical home area, NOT the navigation homepage (2026-10-23)
**Approved correction overriding earlier prototype framing:**
- During one-time character creation the player chooses a permanent **home seasonal biome** (e.g. Winter).
- Their sanctuary is a **distinct, playable physical location inside that chosen home biome**, containing their creatures, eggs, supplies, habitats and home activities (crafting, feeding, hatching, taming, training, breeding).
- **Exploration is a different playable area/mode**. A player with a Winter home may explore Winter, Spring, Summer or Autumn, then return to their **Winter sanctuary**, regardless of the biome explored.
- The sanctuary is **not** a homepage, biome-picker or merely a hub menu. Global navigation / expedition selection should not be conflated with the in-world sanctuary.
- The current GitHub alpha prototype incorrectly labels a biome-selection menu as "Home Sanctuary" and has no actual playable sanctuary. **This is an identified prototype gap requiring correction in the next consolidated build/test batch.**
- Returning from exploration retains acquired rewards and skills, and brings the player to their actual sanctuary in their selected home biome.
- Keep one-time onboarding separate from repeatable play; don't assume every sanctuary system is implemented in the MVP.


## Alpha Test Batch 002 feedback — 2026-10-23
- Tester reports **all tested buttons passed** in alpha v0.2. Screenshot shows Summer as chosen home, a sanctuary screen with one incubating egg, one creature, and retained practice. This is a tester-reported functional pass, **not** verification of persistence across reload or fully implemented sanctuary mechanics.
- **Approved future UI direction:** Exploration is primarily contextual text/story choices. Sanctuary is **visually navigable**, not a text-button list. Its main/home view shows the physical sanctuary with small clickable hotspot dots on graphics for rooms and interactable objects. Clicking a hotspot opens a **visual view of that room** (e.g. incubation room, creature sleeping/bed area, crafting area, personal book library), with relevant interactive objects.
- **Leave to Explore** is accessible from the **sanctuary main view**.
- The current button-only sanctuary is an intentional temporary mechanics-testing scaffold; replace with visual room/hotspot navigation in a later UI development phase. Do not confuse current buttons with the approved final sanctuary experience.
- The player explicitly wants a **personal library for books** within the sanctuary. Details of books and library mechanics are not yet specified; do not invent them.
