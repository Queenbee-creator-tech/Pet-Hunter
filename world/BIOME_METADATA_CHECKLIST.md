# Pet Hunter — Biome Metadata Completion Tracker

Status: **Organized, not complete or implemented.** This document inventories existing approvals and gaps. It does not approve new mechanics, values, or geography. Primary decision history: [BIOMES.md](BIOMES.md). Gameplay and interface mechanics live in `docs/GAMEPLAY_LOOP_AND_WORLD_SIMULATION.md`; engine contracts in `docs/ARCHITECTURE.md`.

## Legend
- [x] Established design direction (not necessarily engine-ready)
- [ ] Needs specific metadata, decisions, or validation
- [~] Partial — working direction exists but required data is missing

## 1. World-level metadata
- [x] Four seasonal biomes: Autumn, Spring, Summer, Winter.
- [x] One fixed persistent world; exact positions and routes are engine-owned.
- [x] Autumn is central; Spring-origin river flows through Autumn lake to Summer ocean.
- [x] Biomes have dramatic identities and physically traversable connections.
- [ ] World dimensions, scale, coordinate model, orientation and elevation range.
- [ ] Concrete biome boundaries, neighboring regions, crossing points and geographic connectivity.
- [ ] Canonical world/biome identifiers and machine-readable world schema.

## 2. Per-biome metadata
- [x] Autumn: central lakeside waterfront town; mostly rolling meadow/hill wilderness, groves, streams and valleys.
- [x] Spring: forest, waterfalls, crystals, elevated river source, small floating land fragments.
- [x] Summer: Ancient Coral seas, reefs, islands, coral forests, deep channels; giant turtles envisioned as transport, not collectible.
- [x] Winter: snowy mountains, cliffs, glaciers, frozen forests, near-permanent polar night and auroras.
- [ ] Per-biome climate/weather ranges and seasonal behavior (not just theme).
- [ ] Terrain category definitions, elevation constraints and distribution. Earlier percentage breakdowns are **provisional, not approved**.
- [ ] Environmental hazard definitions and conditions; how they affect traversal belongs to gameplay/engine.
- [ ] Habitat classifications and environmental suitability for future creature metadata (species lists belong in Creature Development).
- [ ] Gatherable resource categories and placement rules (acquisition costs belong in Gameplay).
- [ ] Hydrology and landmark placement constraints for each biome.
- [ ] Biome metadata schema with validated values for all four.

## 3. Routes, portal locations, and geography
- [x] Fixed public and discoverable hidden routes; players discover hidden routes independently.
- [x] Movement choices come from actual engine-valid connections; no visible player map.
- [x] Sanctuary has one portal for each biome; each biome has one fixed arrival location shared by all players.
- [x] Arrival points are relatively safe, not immune to normal world conditions.
- [ ] Exact portal arrival world location IDs and terrain/connection context.
- [ ] Generated route graph, crossings, obstacles and navigability constraints.
- [ ] Geographical validation: reachability, river continuity, sensible elevation and no isolated mandatory destinations.

## 4. Generator readiness
- [x] Engine must generate/persist geography once; narrator cannot invent or rewrite authoritative geography.
- [ ] Engine-readable schema and representative data for every biome.
- [ ] Generation procedure, persistence format and reproducibility approach.
- [ ] Validation tests for geography, hydrology, routes, portals and metadata completeness.
- [ ] Prototype generator built and tested.

## Out of scope for this tracker
- Essence amounts, potion recipes, portal-stone consumption, combat and critical events: Gameplay/Engine.
- Creature species, rarity, genetics and spawn rates: Creature Development (biomes only provide habitat constraints).
- Narrative prose, portal appearance and interface art: optional later presentation/lore work.

## Suggested next step
Define the **world-level metadata schema** using approved facts first, marking missing values as TBD. Then populate each biome without inventing unapproved values. Review checklist items one at a time.

## Source caveats
`BIOMES.md` is a chronological decision log and contains superseded early text (e.g., references to stamina-gated encounters, player maps, undecided portal stone consumption). Later explicit decisions supersede earlier statements. Do not treat all entries as simultaneously current.


## Decision 033 — World scale and pacing (approved)
- [x] **World-scale target:** moderately sized persistent world, supporting meaningful exploration in shorter sessions rather than excessively long expeditions.
- [ ] Translate this qualitative target into measurable geography, route density, and travel-time parameters after prototype testing; no numerical dimensions or times are approved.

## Metadata extraction milestone — draft files created (2026-10-23)
- [x] Draft machine-readable world metadata: [world.json](metadata/world.json).
- [x] Draft individual biome records: [autumn.json](metadata/autumn.json), [spring.json](metadata/spring.json), [summer.json](metadata/summer.json), [winter.json](metadata/winter.json).
- [ ] Review and approve the schema as an implementation contract. Current files are **draft structured data only**, not a completed or tested generator.
- [ ] Fill unresolved `null` values only through explicit approvals or separately labeled prototype parameters.
- [ ] Validate file parsing, cross-file references, and generator behavior in the Engine thread.
The JSON files intentionally exclude superseded or provisional percentages, map UI assumptions, specific creature spawn rates, unapproved climate numbers and portal visuals.

## Decision 034 — Permanent biome seasons (approved)
- [x] Each seasonal biome permanently retains its namesake season; no global seasonal rotation.
- [ ] Define changing weather conditions and time-of-day behavior separately without assuming particular schedules or frequencies.

## Decision 035 — Dynamic biome weather (approved)
- [x] Weather varies naturally within each permanently seasonal biome, with biome-appropriate patterns.
- [ ] Define weather categories per biome, transition rules, frequency, duration, and engine impacts; examples are illustrative, not an exhaustive approved catalog.

## Decision 036 — Weather system directions (approved)
- [x] Extreme weather can potentially be fatal for unprepared players; exact death/recovery mechanics remain TBD.
- [x] Weather obstacles may be impassable or traversable with risk, depending on conditions and capabilities.
- [x] Weather can change gradually with warnings or suddenly, depending on event.
- [x] Natural shelter and craftable camping equipment are possible protection options.
- [x] Weather affects wild creature behavior, movement and environmental interactions.
- [x] Each biome has distinctive environmental hazards.
- [x] Skills, equipment and preparation can mitigate or overcome weather challenges.
- [ ] Define biome-specific weather and hazard catalogs, thresholds, frequency, timing, shelter effectiveness, skill/equipment requirements, creature responses, and injury/death/recovery mechanics.

## Decision 037 — Biome hazard catalogs (approved)
- [x] Autumn: heavy rainfall, dense fog, flooding, slippery hillsides.
- [x] Spring: heavy rainfall, earthquakes, floods, strong winds.
- [x] Summer: tsunamis, dangerous currents, heat, rough seas.
- [x] Winter: blizzards, extreme cold, avalanches, dangerous ice.
- [ ] Set intensity, frequency, duration, triggers, warning cues, mitigation and consequences for each approved hazard. Earthquakes/tsunamis are geophysical events, not weather.

## Decision 038 — Hazard behavior and persistent-world consequences
- [x] Hazard likelihood varies by location; some areas have greater disaster risk.
- [x] Most disasters have warning signs, though sudden events can occur.
- [x] Hazards may affect survival, movement, equipment condition, creature behavior, and route availability.
- [x] Shelter effectiveness depends on shelter type and hazard severity.
- [x] Disasters may temporarily block established routes without permanently rewriting geography.
- [ ] Specify location risk zones, frequency, warning cues, equipment effects, shelter effectiveness, temporary obstruction duration and restoration rules.
- [ ] Align injury consequences with the still-open health model; preserve approved death/respawn rules.

## Decision 039 — Hybrid environmental action gating (approved)
- [x] Hide opportunities requiring knowledge/recognition the hunter lacks.
- [x] Show unavailable actions for obvious obstacles when skill/equipment requirements are unmet.
- [x] Separate discovery/recognition, attempt eligibility, and success resolution.
- [x] Engine evaluates hunter skills, equipment, conditions and risk; narrator only describes authorized outcomes.
- [ ] Define skill thresholds, item requirements, risk calculations, locked-action wording and tests in the engine/gameplay threads.

## Decision 039 — Hybrid action visibility (approved)
- [x] Hide actions requiring knowledge the hunter lacks.
- [x] Show obvious obstacles' unavailable actions as locked when requirements are unmet.
- [x] Engine evaluates hunter skills, equipment and environmental state; AI narrates eligible options without inventing routes.
- [ ] Specify knowledge gates, equipment gates, optional risk checks, locked-option information and success probabilities.
- [ ] Prototype one obstacle with a small set of actions and test information leakage / route consistency.

## Decision 040 — Canonical world generation
- [x] Rule-guided generation with designer-controlled important landmarks.
- [x] Generate geography once, save and reuse same world for all players and sessions.
- [ ] Define generation constraints, canonical save format and test reproducibility.

## Decision 041 — Autumn terrain balance
- [x] Predominantly open meadows and rolling hills with scattered smaller groves, not extensive continuous forest.
- [ ] Define exact terrain proportions and placements during generation design.

## Decision 042 — Hidden biome discoveries
- [x] Every biome has environment-specific concealed caves/shelters, creature habitats and rare resources.
- [x] Discovery locations remain fixed in the canonical world; perception follows approved hybrid skill gating.
- [ ] Define individual discovery locations, contents, encounter requirements and rarity rates later.

## Decision 043 — World cell scale
- [x] Each grid cell represents 100 m × 100 m.
- [ ] Finalize proposed 256×256 overall grid and biome allocation/ocean inclusion.
- [ ] Specify how narrative travel distances map to grid cells.


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


### Decision 046 — Spring and Winter city geography (approved)
- **Spring's main city is on a substantial floating landmass**, with a waterfall associated with the elevated city. The rest of Spring includes normal forested ground and smaller floating land fragments. Generator must reserve a city-sized elevated landmass; waterfall source/outlet, height, exact position and access routes still need design.
- **Winter's main city is on a valley floor amid the mountain range**, surrounded by mountains but **not built inside or carved into a mountain**. Generator must preserve a traversable valley and routes; precise geometry/coordinates still undecided.
- Generate valid landforms first, then place the cities as constrained landmarks; do not place them randomly on incompatible terrain.


### Decision 047 — Spring floating-city lake and downstream Summer waterfall (approved)
- Water falls from Spring's floating city into a lake directly below the floating landmass.
- That water continues downstream toward Summer and falls again as a waterfall on the route into Summer.
- Preserve the previously approved major waterway Spring → Autumn central lake → Summer ocean; exact confluences, whether the Spring lake and Autumn lake are distinct, and the second waterfall's exact position are not yet specified.
- Generate hydrologically connected lake outlets and elevation drops; do not treat either waterfall as purely decorative.


### Clarification to Decision 047 — Preserve previously approved river (2026-10-24)
The **existing** continuous river is Spring headwaters and waterfalls → Autumn's central freshwater lake → Summer's ocean/Ancient Coral seas. Spring City's floating-land waterfall is connected to this same system. **Do not infer or require a new separate Spring lake, an enormous cross-biome lake, or a revised river route.** Earlier wording in Decision 047 about a lake directly beneath Spring City must not be interpreted as authorizing a distinct additional lake. Exact waterfall-base terrain and any downstream drop geometry remain to be determined without reopening established hydrology.
