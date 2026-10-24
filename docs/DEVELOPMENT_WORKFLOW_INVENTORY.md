# Pet Hunter — Development Workflow Inventory

Status definitions: Design → Metadata → Implementation → Testing → Complete. A decision or metadata entry is not a functioning feature. Update this inventory as each system advances.

| Workflow | Design | Metadata | Implementation | Testing | Current blocker |
| --- | --- | --- | --- | --- | --- |
| World development and generation | In progress | Draft | Not verified / generator not built | Not started | Grid size, cell scale, biome layout, elevation, hydrology, connected terrain, generation constraints |
| Developer-only world inspector | Concept proposed | Not started | Not started | Not started | Agree required layers and generator output schema |
| Exploration, travel, environmental interactions | In progress | Partial | Not verified | Not verified | Route/action rules and world grid |
| Creature species, habitats, genetics, mutations | In progress | Partial | Not verified | Not verified | Complete Autumn starter catalog and test |
| Combat | In progress | Partial | Not verified | Not verified | Engine implementation and integration tests |
| Capture | In progress | Partial | Not verified | Not verified | Engine implementation and integration tests |
| Hatchery and breeding | In progress | Partial | Not verified | Not verified | Engine implementation and integration tests |
| Care and training | In progress | Partial | Not verified | Not verified | Engine implementation and timer tests |
| Mobile-first UI and navigation | In progress | Partial | In progress, some fixes confirmed | Partial manual checks | End-to-end integration and mobile regression |
| Player progression, crafting, equipment | In progress | Partial | Not verified | Not verified | Skill gates, recipes, balancing |
| Persistence and full-game integration | In progress | Partial | Not verified | Not verified | Canonical world storage and end-to-end verification |

## Current focus: World development

### Approved
- One shared canonical geography generated once and saved, reused for all players.
- Four permanently seasonal biomes with Autumn central.
- Rule-guided placement with designer-controlled landmarks.
- Clumped/connected terrain; Autumn mainly meadows and rolling hills with smaller groves.
- Spring headwaters feed Autumn's lake and river continues to Summer ocean.
- Environmental hazards can temporarily obstruct routes without changing fixed geography.
- Hidden biome-specific discoveries at stable locations.
- Engine authoritative for location, routes, action availability and outcome.

### Required before generation
- [ ] Finalize proposed 256×256 dimensions and biome allocation; 100 m/cell approved.
- [ ] Define relationship between approved 100 m/cell scale and narrative exploration movement.
- [ ] Choose coordinate axes, elevation units and neighbor connectivity.
- [ ] Define biome footprint constraints and boundary transitions.
- [ ] Define terrain clustering, adjacency and landform constraints.
- [ ] Define elevation generation, drainage, river routing, lakes, outlets and waterfalls.
- [ ] Define fixed landmarks, towns, safe arrival points, roads and physical routes.
- [ ] Define habitat/resource/hidden discovery placement rules.
- [ ] Define environmental hazard zone placement.
- [ ] Define seed/version policy, generation validation, and immutable persisted map schema.
- [ ] Build and run generator, save one canonical world.
- [ ] Build developer-only world inspector from actual saved grid with terrain/elevation/water/biome/routes layers and validation warnings.
- [ ] Test continuity, reachability, drainage and repeatable loading.

Do not mark generation complete until a saved grid is produced and verified.

## Tutorial MVP — end-to-end playable milestone (planning, not yet approved mechanics)

Goal: a player can start, explore an unlocked Autumn starter region of the canonical Avalora world, engage in an engine-resolved encounter, capture and manage a creature, experience a sanctuary activity, save/reload and continue. This is the first slice of the real game, not a separate throwaway engine.

### Critical path / acceptance checklist
- [ ] **World**: finalize biome allocation for proposed 256×256 grid (100 m/cell approved); finish terrain/elevation/drainage/landmark metadata; generate one saved canonical world; developer inspector verifies clustering, hydrology, routes and starter-area accessibility.
- [ ] **Player & persistence**: create/load hunter; save location, inventory, creature collection, progression, timers and tutorial flags; reload without duplicating rewards.
- [ ] **UI**: mobile-first tutorial entry, exploration panel, navigation, backpack/journal, creature collection, combat/capture, sanctuary activities; no obscured or duplicated controls.
- [ ] **Exploration & travel**: engine-authoritative connected location choices, starter-area landmark/hidden discovery, basic environment interaction, sanctuary return.
- [ ] **Creature content**: Autumn tutorial encounter species, habitat, stats, abilities, capture data; validate any Autumn mutation content included in the playable milestone.
- [ ] **Combat**: deterministic valid encounter state transitions, turn actions, win/loss, team participation and XP only on team victory per approved rules.
- [ ] **Capture**: legal capture attempt with engine-calculated outcome, inventory updates, collection persistence.
- [ ] **Eggs/incubation**: starter/tutorial egg acquisition and incubation flow with collection picker and completion, following existing rules; test duplicate prevention and save/reload.
- [ ] **Care/training**: one complete timed activity with three-slot limits where applicable and claim-to-complete interaction; validate progression/persistence.
- [ ] **Tutorial progression**: guide through an approved sequence, avoid softlocks, end in a repeatable Autumn exploration state.
- [ ] **End-to-end QA**: fresh start → explore → encounter → combat → capture → sanctuary → creature activity → egg incubation → save/reload → continue. Include mobile viewport and failure/retry cases.

### Scope management
- Full four-biome playable content, extensive breeding catalog and PvP are not required to test the first tutorial journey unless explicitly approved as tutorial requirements.
- Preserve already approved mechanics; do not silently replace them with simplified tutorial-only rules.
- The tutorial sequence, starting creature/gear, capture onboarding, and whether incubation is mandatory for tutorial completion remain open design decisions.
- Progress labels reflect documented evidence, not assumptions. An unchecked item is not necessarily absent from the repository; it means completion is unverified.
- World grid **256×256 is a proposed starting dimension**, not yet locked; cell scale, biome proportions and ocean inclusion remain open.


### Decision 043 — 100 m grid cell (approved)
The world grid uses 100 m × 100 m logical cells. A proposed 256 × 256 grid would cover 25.6 km × 25.6 km (655.36 km²). Grid dimensions and biome allocation are now approved; narrative choice distance need not equal one cell.


## Decision 044 — Canonical world grid and biome allocation (approved)
- World grid: 256 × 256 cells at 100 m per cell, 25.6 × 25.6 km (655.36 km²).
- Target biome shares: Autumn 30%, Spring 25%, Summer 25%, Winter 20%; irregular connected boundaries, approximate area targets rather than rectangles.
- Summer's 25% **includes ocean, reefs, islands and underwater habitats** in the same world grid; no separate ocean grid.
- Still to design: elevation/terrain generation, hydrology, precise region shapes and coordinates. Generator and developer inspector are not yet complete.
