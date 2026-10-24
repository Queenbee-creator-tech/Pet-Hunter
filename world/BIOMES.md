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


## Decision 029 — Crafted portal stones for outbound biome travel and sanctuary return (approved)
Players craft **portal stones** and **Essence Potions** at their sanctuary, not while exploring. The sanctuary has a portal for each seasonal biome (Autumn, Spring, Summer, Winter). A crafted portal stone is used to travel from the sanctuary into a chosen biome via its sanctuary portal; when exploring, portal-stone travel instead takes the player directly back to their own sanctuary. Without a usable stone, a player may need to travel home physically using engine-approved routes. The engine validates portal travel and updates the player's authoritative position. Exact biome arrival points, stone consumption per use, costs, crafting recipes, portal unlock requirements, and how inventory requirements work in each direction are still open. This clarifies Decisions 026 and 028; it does not authorize arbitrary teleportation between wilderness locations.


## Decision 030 — Single-use portal stones (approved)
Each portal-stone activation consumes exactly **one crafted portal stone**. This applies both when departing the sanctuary through a biome portal and when returning directly from exploration to the sanctuary. For an outbound trip and portal return, players therefore need two stones. With no usable stone, the player can still return via valid physical routes. Portal stones are crafted at the sanctuary; exact recipe, acquisition costs, biome arrival points, and unlocks remain TBD. The engine validates inventory and decrements the stone count atomically with successful portal travel; narration cannot create free uses.


## Decision 031 — One fixed arrival point per biome (approved)
Each of the four sanctuary biome portals (Autumn, Spring, Summer, Winter) leads to **one permanent, fixed arrival location** within its corresponding biome. All players using a given biome portal arrive at the same persistent world location, not an engine-randomized spawn and not an unlockable list of alternative portal arrivals. Players then navigate outward via engine-approved routes. Exact portal arrival coordinates, landmarks, safety, and visual descriptions are still to be designed. Portal activation continues to consume one crafted stone under Decision 030; returning by portal goes directly to the player's own sanctuary.


## Decision 032 — Relatively safe biome portal arrivals (approved)
Each biome's single fixed portal arrival point is a **relatively safe place to orient oneself**, not a completely protected safe zone and not a deliberately hazardous spawn. Nearby wildlife, natural weather, and environmental conditions remain part of the living world. Risk depends on actual terrain, wildlife, conditions, and player actions, rather than an artificial danger boundary. No invulnerability bubble or absolute guarantee against danger is implied. Exact terrain and nearby hazards for each of the four arrival points remain to be designed.


## Decision 033 — Moderate world scale and shorter meaningful expeditions (approved)
The persistent shared world should be **moderately sized**, allowing players to travel meaningful distances and make worthwhile discoveries during shorter play sessions. Biomes still need enough space for exploration, creature habitats, resources, hidden routes, and environmental variety; avoid unnecessary travel padding or an enormous world for its own sake. Exact map dimensions, route counts, travel durations, and pacing thresholds are **not yet approved** and require prototype testing. This refines earlier descriptions of 'large wilderness scale' without removing the wilderness-first identity.

## Decision 034 — Permanent seasonal identity per biome (approved)
Each biome retains its namesake season permanently: Autumn remains autumn, Spring remains spring, Summer remains summer, and Winter remains winter. Seasons do not rotate across the world. Weather patterns and time-of-day behavior within each biome are separate decisions still to be defined; this approval does not establish specific weather frequencies or a day/night cycle.

## Decision 035 — Variable weather within permanent seasonal biomes (approved)
Weather changes naturally within each biome even though its namesake season remains permanent. Each biome has distinct, season-appropriate weather patterns. Illustrative examples discussed: Autumn sunshine, fog, and rain; Winter clear freezing conditions, snowfall, and blizzards. These examples are not yet an exhaustive or finalized weather-type catalog. Exact probabilities, timing, weather transitions, visibility and traversal impacts remain TBD; engine-authoritative environmental conditions should inform the text narrator.

## Decision 036 — Weather hazards, shelter, and wildlife response (approved; details open)
The following six directions are approved for all four permanent-season biomes:
1. Extreme weather can potentially be fatal for an unprepared player. Exact death, injury, rescue and recovery rules remain unapproved and belong to gameplay/engine design.
2. Some weather-affected obstacles are impassable under current conditions; others can be attempted with increased risk. The engine determines actual traversability and risk; the narrator must not offer impassable routes as selectable movement.
3. Weather events can develop gradually with warning signs or arrive suddenly, depending on the event. Exact forecasting, warning availability, transitions and timing remain TBD.
4. Natural shelters and craftable camping equipment can provide refuge from hazardous conditions. Exact shelter locations, equipment recipes, effectiveness and placement rules remain TBD.
5. Weather affects wild creature behavior, movement and interactions with the environment. Creature-specific rules and spawn mechanics belong to Creature Development / Engine.
6. Each biome has distinctive environmental hazards. Exact biome-specific catalogs and overlapping hazards are not yet finalized.
Equipment, skills and preparation can help players overcome or mitigate weather obstacles (approved alongside these answers). Do not infer exact skill thresholds, equipment types, exposure values, damage, weather probabilities or death penalties. Weather must be simulated as engine-authoritative world state, with the narrator describing supported facts.

## Decision 037 — Approved environmental hazards by biome
- **Autumn:** heavy rainfall, dense fog, flooding, slippery hillsides.
- **Spring:** heavy rainfall, earthquakes, floods, strong winds.
- **Summer:** tsunamis, dangerous currents, heat, rough seas.
- **Winter:** blizzards, extreme cold, avalanches, dangerous ice.
These are approved environmental hazard categories, not a finalized list of every possible weather state. Earthquakes and tsunamis are environmental/geophysical events rather than weather. Event frequencies, intensity, duration, warning signs, exact effects, equipment counters, skill requirements and world-state consequences remain TBD. Preserve earlier approval that hazards may be fatal when unprepared and some routes may be impassable while others remain risky.

## Decision 038 — Location-based hazard behavior and temporary route impacts (approved)
- Major disaster likelihood depends on location; some areas are more hazardous than others, even within the same biome. Exact location risk zones and event probabilities are TBD.
- Disasters usually have warning signs, but some events can happen suddenly. Warning reliability, skill modifiers and lead time are TBD.
- Environmental hazards can affect hunter survival, movement, equipment condition, wild creature behavior, and route availability. The precise effects and damage/injury mechanics remain TBD.
- Shelter effectiveness varies with shelter type and hazard severity; no shelter is assumed universally protective. Shelter construction and effectiveness rules remain TBD.
- Disasters may temporarily alter environmental conditions and block established routes (e.g. flooding or debris). The fixed persistent geography remains intact; no permanent terrain reshaping is approved. Exact persistence, clearance and reset mechanisms are TBD.
- The authoritative engine determines hazard events, route accessibility and consequences. AI narrates only approved state. Death/respawn follows docs/PLAYER_INJURY_DEATH_RESPAWN.md; do not add Portal Stone respawn costs or progress loss.

## Decision 039 — Hybrid skill-gated environmental actions (approved)
- Actions requiring knowledge or recognition the hunter lacks remain hidden; the narrator must not reveal the hidden opportunity as an available action.
- When an obstacle is obvious to the hunter, an action may be visible but unavailable if the required skill or equipment is missing.
- Once requirements are met, an action becomes selectable, but success is not guaranteed for risky actions. The authoritative engine evaluates skill levels, equipment, terrain, weather and other relevant state to determine eligibility and resolve success/failure.
- Distinguish three separate stages: recognizing an opportunity, qualifying to attempt it, and succeeding at the attempt. Survival/observation capabilities may affect recognition; crafting/equipment and other skills may affect eligibility and odds.
- No specific skill thresholds, items, probability formula, locked-action disclosure details or UI wording are approved yet. This is a design decision, not a claim of implemented engine behavior.

## Decision 039 — Hybrid skill-gated environmental actions (approved)
Environmental obstacle actions use hybrid visibility. Actions requiring knowledge the hunter has not acquired are hidden. Obvious environmental obstacles can have visible but unavailable/locked actions when requirements are unmet. The engine evaluates hunter skills, equipment, relevant conditions, and the current world obstacle to decide what can be perceived, what actions are offered, what is locked, and which eligible actions can be attempted. A skill/equipment-qualified attempt is not guaranteed to succeed; exact success probabilities and checks remain TBD. Survival skills can enable recognizing hazards/opportunities; crafting progression and suitable equipment can enable or improve traversal. This is a worldbuilding/gameplay contract, not a finalized skill taxonomy or numerical formula. Avoid revealing undiscovered hidden routes or knowledge through locked options. Keep this feasible for the first prototype by implementing a small fixed set of obstacles/actions before expansion. See gameplay/engine documentation for implementation.

## Decision 040 — Generated-once, immutable shared geography (approved)
Use rule-guided generation (Option B) to arrange most explorable terrain and locations while preserving designer-controlled important landmarks. Generate the canonical Avalora geography once, persist the result, and load that same saved geography for every player and session; do not regenerate on login, character creation, or biome travel. Fixed features and hidden routes retain their canonical locations even when individually undiscovered. Temporary hazard conditions may affect accessibility without changing permanent geography. Generation algorithm, seed, landmark coordinates and final world layout are not yet implemented or finalized.

## Decision 041 — Autumn open terrain with scattered small groves (approved)
Autumn is predominantly open meadows and rolling hills, with mostly smaller groves scattered among them rather than large continuous forests. Preserve the established central lakeside town, freshwater lake, streams and valleys. Specific terrain percentages and exact placement remain TBD; canonical generated locations remain fixed.

## Decision 042 — Biome-specific hidden discoveries (approved)
All four biomes contain their own environmentally appropriate hidden discoveries, including versions of concealed caves/shelters, creature dens/nests/habitats, and rare gatherable resources. Autumn's scattered groves can conceal such finds; equivalent discovery opportunities adapt to Spring forests/waterfalls, Summer coasts/reefs/seas, and Winter mountains/ice. These are categories, not finalized specific locations, species, materials, or frequency. Hidden discoveries occupy stable locations in the one canonical saved world. Knowledge-gated discovery visibility follows Decision 039; engine owns discovery state and location, AI narrates without inventing locations.

## Decision 043 — World grid cell scale (approved)
Each logical grid cell represents 100 meters per side. At the proposed 256×256 dimensions, the extent would be 25.6 km × 25.6 km (655.36 km²). Cell size is for engine geography and does not mandate one text movement choice per cell. Grid dimensions, biome allocation and ocean inclusion are now approved.


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
