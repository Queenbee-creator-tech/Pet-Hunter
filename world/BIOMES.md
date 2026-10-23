# Pet Hunter — World and Biome Framework

Status: Working metadata. Explicitly approved decisions are distinguished from proposals. No biome map has been generated or tested.

## Approved world foundations
- One persistent, continuous fantasy world shared by up to 10 players initially.
- Text-based exploration, with individual adventures in a multiplayer universe.
- The world's geography is generated once from metadata and persisted for all players.
- Four seasonal regions: Autumn, Spring, Summer, Winter.
- Large wilderness scale, with meaningful expeditions between regions.
- Dramatic fantasy biome boundaries rather than gradual transitions, while retaining physical geographical connections.
- Different geographical access restrictions for each biome (Decision 003); specific entry mechanics remain provisional.
- Autumn is the central civilization and connecting region.
- Autumn's primary settlement is an established fantasy town (approved). Its exact layout, buildings, services, and population remain TBD.
- Spring is forest-dominated with soft shaded light, glowing plants, waterfalls, scattered crystal formations and small floating land fragments. No giant flowers or crystal-made trees.
- Winter is a harsh, high-mountain wilderness, with near-permanent polar night, auroras, white/silver ice, frozen forests and cliffs.
- Summer is across the water, with an Ancient Coral environment: shallow turquoise ocean, walkable coral forests and reef islands. Giant turtles are intended as transport, not collectible pets.
- Optional player homes/sanctuaries in a chosen biome; exploration remains the primary focus.

## Proposed region access — not yet approved
| Region | Physical barriers | Candidate access |
| --- | --- | --- |
| Autumn | Central heartlands | Relatively accessible starting area |
| Spring | Dense forest, ravines, cliffs | Walking routes; special traversal for floating land |
| Winter | Mountains, ice, extreme cold | Mountain passes, equipment, creature abilities, route knowledge |
| Summer | Open water and deep channels | Water transport, potentially giant turtles |

Proposed map classification for each biome: entry region, deep wilderness, restricted locations. These are not separate levels.

## Provisional environment composition — not approved
- Spring: 55% forest, 20% hills/meadows, 12% cliffs/rocky highlands, 8% rivers/lakes, 5% wetlands/clearings.
- Summer: 40% shallow ocean/lagoons, 25% coral forests/reefs, 15% islands/coastal land, 15% deep channels, 5% caves/limestone formations.
- Autumn: 45% rolling grasslands/hills, 15% open woodland, 10% rivers/lakes, 15% settlement/cultivated land, 15% rocky terrain/wild valleys.
- Winter: 35% frozen mountains/cliffs, 25% snowy forest, 20% glaciers/ice fields, 15% valleys/tundra, 5% frozen lakes/rivers.

Percentages are targets and need clear category definitions before implementation; landmarks and caves may be overlays instead of exclusive terrain.

## Generator and narrator design recommendations — not approved mechanics
- Generate coherent connected terrain, elevation, waterways and reachable routes rather than random independent tiles.
- Save the generated map and shared geography; do not let narration rewrite persistent landmarks.
- Biome metadata should define terrain, climate, light, vegetation, hydrology, hazards, resources, habitat suitability, landmarks, traversal and lore.
- Creature encounters and shared-world resource depletion are separate gameplay decisions.

## Open worldbuilding questions
- Exact geography, compass orientation, map dimensions and cell scale
- Placement of the starting settlement, additional settlements and player homes
- Entry routes, degree of access restrictions, transport details
- Climate, hydrology, ecological resources, native species and habitat distribution
- Landmark counts, crystal and floating-island distribution, lore
- Initial playable region and generator validation

## Original initial creature roster target (provisional)
6 common + 12 rare + 4 epic + 2 legendary = 24 species per biome, 96 across four biomes. Prototype scope should be smaller; do not treat targets as implemented.

## Decision 004 — Autumn central settlement (approved)
An established fantasy town is the main civilization center, rather than a small village or large city. It is a recognizable inhabited hub surrounded by substantial explorable wilderness. Markets, workshops, roads and other specific features remain proposals pending approval.

## Decision 005 — Autumn town location (approved)
The established central Autumn fantasy town sits beside a large freshwater lake, surrounded by rolling hills, open countryside/grasslands, and scattered woodland. Lake name, town name, settlement layout, shoreline access, and precise hydrology remain TBD.

## Decision 006 — Autumn central lake character (approved)
The town's large freshwater lake is crystal-clear and peaceful, with gentle accessible shores and scenic views of rolling hills, grasslands, and scattered woodland. The lake's size, depth, name, outlets, wildlife, and other features remain TBD; do not assume it has mysterious islands or a major river connection.

## Decision 007 — Autumn town waterfront layout (approved)
Autumn's established fantasy town is a waterfront settlement directly along the shore of its peaceful, crystal-clear freshwater lake. Buildings, walking paths, and docks line the lakeshore. Fishing systems, boats, aquatic encounters, and specific dock functions remain proposals, not approved gameplay mechanics.

## Decision 008 — Autumn countryside population (approved)
Autumn beyond the main waterfront town is mostly isolated, uninhabited wilderness. Secondary settlements are very few; isolated structures may exist but should be uncommon. Maintain a wilderness-first exploration identity. Exact counts, road density, ruins, and outpost placement remain TBD.
