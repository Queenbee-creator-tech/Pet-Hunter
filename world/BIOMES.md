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

## Decision 020 — Dynamic narrator visibility and engine authority (approved)
Visibility is dynamic, not a fixed-distance radius: terrain, weather, time of day, occluding obstacles, and elevation determine which near-, middle-, and far-distance features the engine can legitimately expose from a player's exact position. Appropriate player skills, equipment, or creature abilities may affect perception, subject to later mechanics approval. Near/middle/far are descriptive relative bands rather than rigid universal distances. The engine is authoritative about world facts, visibility and movement; the LLM narrator only interprets and describes engine-provided facts and must not change geography or position. Exact visibility calculations, ranges, perception bonuses and environmental effects remain TBD.

## Decision 021 — Natural narrative memory for visited locations (approved)
Players have no automatic exploration journal, map, GPS, or quest-marker navigation. The narrator may naturally reference places a player has visited before when supported by persistent player history and current engine-provided surroundings, but does not act as an omniscient route-finding assistant or automatically provide perfect directions. Players navigate by environmental descriptions, landmarks, directions, and their own memory. Previously visited geography remains fixed and engine-authoritative. The narrator must not imply a remembered landmark is physically nearby unless the engine's spatial context supports that observation.

## Decision 022 — Narrator-provided movement choices (approved)
Player movement is selected from narrator-presented choices rather than free-text directional commands. The game engine determines the currently valid exits/routes/destinations using the player's authoritative position, persistent terrain, discoveries, and access restrictions; the narrator renders those engine-approved choices in immersive text. Selecting a choice triggers engine validation and position updates before the next scene is narrated. The LLM must not offer nonexistent routes or unearned hidden routes. This decision applies to movement input; whether non-movement actions use free text is a separate open question.

## Decision 023 — Engine-driven variable movement choices (approved design direction)
Do not impose a fixed number or arbitrary cap on movement choices. At each position, the authoritative engine evaluates actual traversable routes, terrain, obstacles, conditions, and the player's skills/equipment, then supplies the available choices to the narrator. The LLM describes only engine-approved movement options and cannot create, suppress, or override world constraints. A cave might offer only deeper/exit; a cliff might permit retreat and, when genuinely traversable, a ledge or climb; an uncrossable river does not offer crossing. Each choice should resolve through a stable internal route/action identifier rather than parsing narrated prose as authoritative navigation. Number of choices varies with real possibilities, potentially including six or more. Non-movement interactions and UI presentation are separate decisions. Implementation details and handling of too many valid exits TBD.

## Decision 024 — Describe unavailable routes but do not offer them as selectable movement (approved)
The narrator may naturally describe physically present but currently inaccessible routes and, when supported by engine facts, hint at skills/equipment needed to use them. Only engine-validated currently traversable routes appear as selectable movement choices. Do not render unavailable movement as disabled/locked choices, and do not omit relevant environmental features merely because they are inaccessible. The narrator must not imply an inaccessible route can become accessible later unless the engine defines a real route and applicable requirements. Engine authority over movement and world facts remains absolute.

## Decision 025 — Engine-driven critical event system (concept approved; specifics TBD)
Critical events may be triggered by dangerous actions or environmental situations (e.g., falling into a hole, falling off a cliff, traps, attacks). The authoritative engine detects/initiates the event, provides valid context-sensitive reaction choices, resolves consequences, and updates character/world state; the LLM narrator only dramatizes the engine-provided event and choices. Outcomes need not be fixed right/wrong per choice: player skills, equipment, circumstances, and possible randomness may influence success, injury, survival, or death. Multi-stage events and timed decisions are proposed possibilities, not yet finalized. Exact skill checks, probability formulas, timing, death rules, and event frequency remain open. This is also a gameplay-engine requirement and should be mirrored in engine documentation later.


## Decision 026 — Return travel, craftable portal stones, and stamina (approved direction; details open)
Players ordinarily return from expeditions by physically retracing valid engine-approved routes. Crafting progression can provide portal stones that allow an automatic return instead of ordinary travel; the exact destination restrictions, cost, consumability, and other portal rules are not yet decided. Crafting also includes stamina-restoring potions. If the player returns with insufficient stamina, they may continue ordinary return movement, but cannot initiate stamina-costing encounters or actions until they have enough stamina, unless they use a stamina potion or recover through an approved mechanism. Established home/sanctuary regeneration: 2 stamina per 5 minutes. World events and involuntary dangers are distinct from voluntary encounters; how they behave at zero stamina remains to be decided. The engine enforces all movement, item, stamina and encounter restrictions; the narrator describes approved outcomes.

## Clarification to Decision 026 — acquisition resource, not general stamina (2026-10-23)
The resource previously called hunter stamina limits **capturing creatures, collecting eggs, and gathering materials**, not travel, creature encounters, combat, defensive reactions, or gaining character/skill XP. A player with zero resource may continue exploring and fighting on the way home; they cannot attempt physical reward acquisition until the resource is replenished (e.g. by a crafted restorative potion or home/sanctuary regeneration at +2 per 5 real-world minutes). The current 'stamina' name and 'stamina potion' name are temporary pending a more accurate term. Separate creature stamina is unaffected. This supersedes any earlier implication that zero hunter stamina blocks encounters or combat.


## Decision 027 — Essence replaces hunter stamina (approved)
The hunter's reward-acquisition resource is named **Essence**, with craftable **Essence Potions**. Essence is used for attempts to capture creatures, collect eggs, and gather materials; it does not limit travel, combat, defense, encounters, or XP gain. Players may return from expeditions at zero Essence and still engage with the world, but cannot acquire Essence-gated physical rewards until restored. Essence regenerates at home/sanctuary at +2 per 5 real-world minutes. Creature stamina is a distinct mechanic. The resource's magical origin and exact costs are TBD. This supersedes earlier 'hunter stamina' wording in world decisions.


## Decision 028 — Sanctuary portals for all four biomes (approved core)
The player's sanctuary contains a portal associated with each of the four seasonal biomes: Autumn, Spring, Summer, and Winter. These are sanctuary-based biome travel access points, not an arbitrary network of portal destinations scattered across the wilderness. The engine controls valid destinations and player location. Exact arrival locations, unlock conditions, travel costs, and the relationship between sanctuary portals and craftable return portal stones are not yet approved. Do not assume a portal enables arbitrary fast travel within a biome.
