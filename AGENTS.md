# AGENTS.md — Pet Hunter development working agreement

This file is the repository working instruction for coding assistants and collaborators. Read README.md and docs/DEVELOPMENT_WORKFLOW_INVENTORY.md before making design or implementation changes. This file guides work on the repository; it does not override user instructions or tool/system policies.

## Non-negotiable project direction
- Pet Hunter is a **mobile-first, text-led fantasy creature game**. The game engine is authoritative for world state, geography, legal actions, skill/equipment gates, probabilities, encounters and persistence. AI narration may describe engine-approved facts but must not invent map routes, creatures or outcomes.
- **The tutorial is part of the real game.** Do NOT build a separate tutorial app, temporary map, duplicate combat/capture engine, mock-only gameplay path, or tutorial-only save system. Build reusable production modules and layer tutorial guidance/flags on top of them.
- **Avalora is one shared, canonical world generated once and saved.** Never regenerate geography for each player, session or login. Weather and hazards may temporarily affect access, not permanent terrain.
- Preserve existing approved rules and data. Distinguish approved decisions from examples, proposals and provisional values. Ask before locking new mechanics or balance constants.
- Never mark a workflow complete because a document, UI mockup or metadata exists. Completion requires functioning integration and passing tests.

## Required workflow every time
1. Read README.md, this file and docs/DEVELOPMENT_WORKFLOW_INVENTORY.md. Check relevant code/docs and current GitHub state.
2. Identify the **active workflow**, its unmet checklist items, and whether the task is design, metadata, implementation or testing.
3. Explain the smallest next step and why it is needed, in beginner-friendly language. Discuss decisions with the user; do not silently approve thresholds, formulas, map proportions or mechanics.
4. Implement only approved scope in the **real shared game systems**. Keep UI and engine responsibilities separated.
5. Test with evidence: unit tests for engine rules, integration tests for persistence/flows, mobile checks for UI. Report untested behavior clearly.
6. Update README.md when roadmap/active milestone changes; update docs/DEVELOPMENT_WORKFLOW_INVENTORY.md checkboxes/status and this AGENTS.md when the working plan changes. Record approved world decisions in world/BIOMES.md, world/BIOME_METADATA_CHECKLIST.md and appropriate world/metadata/*.json.
7. End each task with **what changed, what was tested, what remains, and the single next action**. Never claim a GitHub update succeeded until its tool call succeeds.

## Current active workflow: world generation (do this first)
- Selected starting grid proposal: **256 × 256** cells (65,536). **NOT finalized**: biome allocation, Summer ocean inclusion, coordinate convention and elevation units.
- Decide cell scale, biome area constraints and orientation; define terrain clustering and connected region rules.
- Define elevations first, then hydrology: headwaters and river paths descend, tributaries join, lakes have consistent inflows/outflows, waterfalls require elevation drops. Preserve approved Spring → Autumn freshwater lake → Summer ocean river route. Winter is mountainous.
- Autumn: predominantly open meadows/rolling hills with smaller clustered groves, central lakeside town and lake. All four biomes contain environment-appropriate hidden caves/habitats/rare resources at permanent locations.
- Define important fixed landmarks, routes, sanctuary portal arrival points, habitats, resources, hazard zones, seed/version policy, map serialization and validation checks.
- Implement the real generator, save **one canonical map**, and create a **developer-only world inspector** reading that saved map (terrain, biome, elevation, water, routes, landmarks and validation warnings). Player UI does not expose a world map.
- Tests: no isolated forest speckles contrary to rules; rivers never flow uphill; drainage reaches lakes/outlets; waterfall elevation drops; valid land/water adjacency; safe reachable Autumn starter path; repeat loads reproduce same geography. Mark complete only after evidence.

## Tutorial MVP critical path after world
1. Hunter creation/load and persistent game state.
2. Autumn exploration and engine-authoritative travel/interactions.
3. Approved Autumn creatures, habitat, stats, encounter and mutation test coverage.
4. Combat resolution and capture integrated with real collection; XP awarded only for winning team, with participation-based allocation according to approved rules.
5. Egg collection selection, three incubator slots, timers, hatch and persistence.
6. Sanctuary care and training timers, three concurrent slots as approved, claim-to-complete.
7. Mobile-first interface and guided tutorial flow integrated into real screens.
8. End-to-end: new hunter → explore → encounter → battle → capture → sanctuary → care/training → egg/incubation → save/reload → continue. Test failure paths and prevent softlocks.

Consult existing design docs for details; do not infer missing capture probabilities, species lists, numerical travel scale, injury formulas or tutorial rewards. Tutorial script and graduation conditions remain open.

## Progress reporting template
- **Workflow / phase:**
- **Approved scope being implemented:**
- **Files changed:**
- **Tests run and results:**
- **Open decisions / blockers:**
- **Next actionable step:**

## Links
- [Project README](README.md)
- [Workflow tracker](docs/DEVELOPMENT_WORKFLOW_INVENTORY.md)
- [Worldbuilding](world/BIOMES.md)
- [World metadata checklist](world/BIOME_METADATA_CHECKLIST.md)
- [World metadata](world/metadata/world.json)


### Decision 043 — 100 m grid cell (approved)
The world grid uses 100 m × 100 m logical cells. A proposed 256 × 256 grid would cover 25.6 km × 25.6 km (655.36 km²). Grid dimensions and biome allocation are now approved; narrative choice distance need not equal one cell.


## Decision 044 — Canonical world grid and biome allocation (approved)
- World grid: 256 × 256 cells at 100 m per cell, 25.6 × 25.6 km (655.36 km²).
- Target biome shares: Autumn 30%, Spring 25%, Summer 25%, Winter 20%; irregular connected boundaries, approximate area targets rather than rectangles.
- Summer's 25% **includes ocean, reefs, islands and underwater habitats** in the same world grid; no separate ocean grid.
- Still to design: elevation/terrain generation, hydrology, precise region shapes and coordinates. Generator and developer inspector are not yet complete.


### Decision 045 — Spring floating lands vs Winter mountains (approved)
- Spring is **not** a mountain biome. It has ordinary land and dense forest plus small floating land fragments above the ground. Floating land has independent vertical height data and must not be generated as a conventional mountain range.
- Winter contains Avalora's highest natural mountain range and elevations above the other biomes.
- Spring's river can descend across regular terrain into Autumn; a Spring–Winter connecting mountain chain is **not required** and should not be generated by assumption.
- Exact numeric elevation bands and floating-island placement are still undecided.
