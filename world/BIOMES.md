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

## Decision 009 — Autumn wilderness landscape (approved)
Autumn's dominant wilderness landscape is rolling meadows and grassy hills with scattered small groves, streams, and gentle valleys. It should feel open and spacious, distinct from Spring's dense forest. Groves should form coherent clusters and streams follow terrain. Exact terrain percentages and stream connectivity remain to be defined.

## Decision 010 — Autumn lake river connection (approved)
A major freshwater river flows into and out of Autumn's large, clear, peaceful central lake beside the waterfront town. The generator must maintain continuous connected water flow through the lake. River source, downstream destination, direction, width, crossings, and navigability are TBD. Small tributaries remain possible but are not approved as a required network.

## Decision 011 — Autumn river outlet toward Summer (approved)
The major freshwater river flows through Autumn's central lake and downstream toward the coastline connected to Summer's Ancient Coral seas, ultimately emptying into the ocean. The upstream source, exact route, estuary form, navigability, hazards, and whether the river is usable as a player travel route remain TBD. Preserve coherent downstream hydrology.

## Decision 012 — Major river source in Spring (approved)
The main river originates from converging streams and waterfalls in Spring's elevated forest valleys, flows through Autumn's countryside into and out of the central lakeside town's freshwater lake, and eventually empties into the ocean connected to Summer's Ancient Coral seas. The approved overall flow is Spring -> Autumn -> Summer. Exact source coordinates, tributaries, elevation, estuary, river name and travel mechanics remain TBD. Winter need not connect to this specific river.

## Decision 013 — Skill-gated river navigation (approved direction)
The main river may serve as a substantial boating route, but a player should need appropriate crafting skills and traveling/navigation skills to independently build and operate watercraft for this route. The river geography is persistent and shared; skills affect player capability, not terrain. Exact skill thresholds, vessel classes, alternative acquisition methods, hazardous segments, and whether the whole route is navigable remain TBD. Players may explore riverbanks without boating.

## Decision 013 — Skill-dependent river travel (approved)
The Spring -> Autumn -> Summer river is primarily a land exploration route for players without appropriate capabilities. Players who develop sufficient crafting and traveling skills may access mostly navigable river travel using suitable watercraft. This is a player capability gate, not a change to persistent river geography. Waterfalls, rapids, shallows, and other hazards may still impose restrictions. Exact thresholds, equipment, navigation rules, and exceptions remain TBD. Candidate metadata fields: required_crafting_skill, required_travel_skill, watercraft_type, river_hazard.

## Decision 014 — Multiple solutions for river hazards (approved)
Dangerous river sections may support several solutions: carry watercraft around an obstacle (portage), locate a safer alternate route, or use advanced traveling skills and specialized equipment to navigate it. Not every obstacle must support every solution; impassable waterfalls or terrain can still require bypasses. Hazards are fixed shared-world geography, while available solutions depend on the player's skills, equipment and route knowledge. Exact hazard taxonomy, risk/failure outcomes and requirements remain TBD.

## Decision 015 — Known and hidden routes (approved)
Major travel routes are known from the beginning. Other trails, shortcuts, and alternative crossings may be hidden until discovered. Route geography and traversability remain fixed within the shared persistent world; each player can independently discover and track knowledge of routes. Discovery mechanisms (observation, exploration, travel skill, maps, clues) and any information-sharing rules remain TBD. The AI narrator must not invent permanent shortcuts absent from the generated map.

## Decision 016 — Exploration and travel skills reveal hidden routes (approved)
Players discover hidden paths, shortcuts, and crossings through exploration, careful observation, and environmental clues. Traveling skills improve discovery and may allow identification of especially difficult-to-find routes. Basic discoveries need not be gated behind high skills. Each player's discovered-route knowledge is tracked individually while the underlying routes exist permanently in the shared generated world. Exact thresholds, probabilities, checks, and clue mechanics remain TBD.

## Decision 017 — Hidden route discoveries are personal (approved)
Hidden-route discovery records are individual to each player, even in the shared persistent multiplayer world. Players cannot transfer discovered-route map unlocks or route information through a route-sharing system; each player must discover hidden trails, shortcuts, and alternative crossings independently through exploration/observation and traveling skills. Major public routes remain known to all from the beginning. The underlying geography is identical for all players. Whether players can physically accompany one another on routes they have not yet discovered is a separate unresolved rule.

## Decision 018 — Solo text-based exploration; multiplayer limited to PvP (approved clarification)
Pet Hunter is a text-based, primarily solo exploration game. Each player explores, discovers hidden routes, tracks maps, and progresses independently. Interactive multiplayer is limited to PvP for the current scope; large-creature fights were mentioned as a possible combat context, with exact multiplayer format TBD. Do not design cooperative exploration, player-following through hidden passages, or shared route discoveries as current features. A consistent generated world map can still be common to players without live co-presence or synchronized exploration. This supersedes earlier assumptions that 10 players explore together interactively; player-capacity/server architecture is a separate technical question.

## Decision 019 — Mapless, narrator-driven exploration in one persistent world (approved clarification)
Pet Hunter uses ONE persistent, fixed, engine-known world, not a new world generated for each player/session. The game engine always tracks each player's exact position and authoritative geography. The LLM narrator receives the player's position and a bounded, position-relative view of nearby, middle-distance, and faraway surroundings, then describes the environment in immersive prose like an interactive fantasy book. Players have NO player-facing world map, fog-of-war map, or map-click navigation. They navigate by descriptions, landmarks, directions, remembered journeys, and their own memory; revisited places persist in the world. The narrator cannot authoritatively create/move geography or determine movement outcomes outside engine validation. Supersedes previous references to player maps, map unlocks, or route discovery records as map UI; hidden-route discovery remains personal experiential knowledge. Exact narrator visibility radii, occlusion, memory aids, and movement resolution TBD.
