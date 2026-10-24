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


## Approved stamina recovery and character profile direction (2026-10-23)
- Hunter stamina **begins recovering only when the player returns home to their sanctuary**, at **+2 stamina per 5 real-world minutes**. The current alpha maximum is 20, subject to future balancing. Exploration does not regenerate stamina. Recovery can catch up after the browser is closed, as long as the hunter remains at home.
- The **Codex/Journal** will have a **Character** section with a visual representation of the hunter and their stamina, and a toggle to a **Skills** view displaying learned skills/progress. This is a future graphical UI requirement; current prototype may show a text placeholder. Do not conflate this with the sanctuary's room-hotspot navigation or personal book library.
- Alpha v0.4 prototype implements basic home recovery logic and a text character/skills navigation placeholder; automated tests have been authored, but passing CI and real-browser behavior still require verification.


## Revised starting civilization and travel/relocation progression (2026-10-23)
- **Supersedes earlier onboarding choice of a starting home biome:** every new hunter begins in the **Autumn Civilization**, with their starting sanctuary in Autumn.
- **Travel to other biomes** depends on relevant hunter skills, available resources/equipment and situational requirements; exact routes, thresholds and exceptions remain to be designed.
- **Relocating a sanctuary** to another biome is separate from travel and requires sufficient in-game money. A player may visit a biome without moving home there. Costs and any additional prerequisites are not yet set.
- The existing alpha still offers a home-biome choice and unrestricted expedition destination selection; these are outdated prototype behaviors, not the revised approved design. Update them in a later implementation pass with suitable migration for existing saves.

### Approved relocation requirement clarification (2026-10-23)
- Sanctuary relocation requires **both** enough in-game money **and** satisfaction of the destination biome's survival/habitation requirements. Travel access alone is insufficient.
- Exact survival criteria and thresholds are undecided; do not invent permanent numeric requirements.


## Critical Event System — engine-driven active actions (design direction, 2026-10-23)

**Approved core principle:** The engine, not the LLM narrator, owns the world state, triggers, valid choices, skill checks, chance, and consequences. The narrator dramatizes engine-provided situations and outcomes without inventing or changing rules.

**Critical event examples:** A player falls into a hole, slips from a cliff, triggers a dangerous obstacle, or faces a contextual NPC thief/stealing-creature encounter. The thief scenario remains **proposed**, not a finalized theft mechanic.

**Proposed event sequence:**
1. The engine detects an event trigger from a player's actual location, action, terrain, and circumstances.
2. The engine enters a critical-event state and determines possible immediate reactions; only valid options are selectable.
3. The narrator conveys urgency in immersive prose and presents the approved choices.
4. The engine resolves a selected reaction based on applicable skills, equipment, creature abilities, environmental conditions, and (where appropriate) a random check. The same choice can succeed for one character and fail for another; avoid universal predetermined right/wrong buttons.
5. The engine records any consequences (e.g., averted fall, new position, injury, lost or recovered property, or potentially character death) and, if danger continues, may open another event stage.
6. The narrator describes only the authoritative outcome.

**Cliff/hole example:** Catch a branch, aim for a ledge, protect the head, or use suitable gear, **only if the engine verifies the opportunity actually exists**. Successful first reactions may lead to another decision (e.g., hanging from a branch and needing to climb to safety). Do not invent branches or ledges to rescue a player.

**Thief example (NOT YET APPROVED AS A LIVE MECHANIC):** In a plausible context, the engine could trigger a suspicious NPC or stealing-creature encounter. Players might notice warning clues, protect belongings, pursue, negotiate, confront, or attempt recovery where valid. Detection and recovery outcomes should reflect skills, preparedness, circumstances and risk. Do not automatically steal rare/irreplaceable items or impose unavoidable losses; exact protections and recovery rules require approval. This does not imply open-world player-to-player theft.

**Still undecided:** Whether some events have real-time decision timers; countdown duration and timeout behavior; frequency and severity; success formulas; injury/death and respawn rules; theft eligibility, item protection, and recovery; creature-assisted reactions; accessibility and connection-loss behavior. These are **design notes, not implemented or tested features**.


## Approved return-trip resource loop — portal stones and stamina (2026-10-23)
- Players can return by ordinary physical travel through engine-approved routes.
- Crafting progression will include **portal stones** for automatic return and **stamina potions** to restore stamina. Portal-stone destination, cost, use limits, and unlock requirements are TBD; no unrestricted fast-travel network is implied.
- Returning on foot with too little stamina remains possible. The player can still initiate and participate in encounters, combat, defensive actions, exploration, and XP/skill-XP earning; only physical reward-acquisition attempts (capturing creatures, collecting eggs, gathering materials) are blocked when the acquisition resource is insufficient. A stamina potion can restore enough stamina to permit those actions, subject to eventual item rules.
- Stamina recovery at home/sanctuary remains **2 stamina per 5 minutes**. Do not assume normal wilderness travel regenerates stamina.
- The environment may still present hazards or creatures during low-stamina return travel. Rules for unavoidable encounters, defensive reactions, critical events and zero-stamina safety are **open** and must not be invented by the narrator.
- Engine owns eligibility, stamina accounting, item consumption and position updates; the narrator only presents authorized actions and outcomes.


## Approved combat format — text-based, turn-based tactical combat (2026-10-23)
Combat is **turn-based**, inspired by the decision-oriented pacing of XCOM, adapted to Pet Hunter's mobile-first text adventure. The engine determines combat state, whose turn it is, legal actions, combat-specific costs if any, hit/success checks, effects and consequences. The LLM narrates the authorized result and offers only engine-approved choices; it never determines outcomes independently. Exploration, critical-event decisions, and structured combat are distinct interaction states. Examples such as attack, defend, item use, companion commands and retreat are illustrative only; precise combat actions, turn order, movement/positioning, initiative, creature participation, encounter triggers, and failure/death consequences remain TBD. This is a design decision, not an implemented or tested feature.

## Clarification — Hunter “stamina” is a reward-acquisition resource (2026-10-23)
**Approved correction:** The existing label *hunter stamina* is provisional and misleading. This meter is functionally analogous to a limited supply of Poké Balls: it limits **physical reward acquisition**, not exploration, combat, or creature interaction. Players with zero acquisition resource can still encounter, observe, fight or attempt to disable creatures, defend themselves, travel, and earn character XP and skill XP. They cannot attempt to capture a creature, collect an egg, or gather materials until they have enough resource. Combat does not consume this meter merely because it is combat. Existing references to stamina-gated encounters/combat are superseded by this clarification. Craftable 'stamina potions' should be renamed consistently once the meter's final name is approved; they restore this acquisition resource. Previously agreed home/sanctuary recovery remains +2 per 5 real-world minutes. Separate creature stamina remains a different system. Final meter and potion names, resource costs, and balancing remain TBD.


## Decision 027 — Essence naming (approved, 2026-10-23)
The hunter reward-acquisition resource is officially named **Essence**, replacing the misleading label 'hunter stamina'. Essence is required for attempts to capture creatures, collect eggs, and gather materials. Exploration, encounters, fighting, defense, character XP, and skill XP remain possible at zero Essence. The craftable restorative is an **Essence Potion** (formerly 'stamina potion'). Essence regenerates at the sanctuary/home at **+2 per 5 real-world minutes**; the alpha cap of 20 is provisional. Creature stamina remains a separate mechanic and is NOT renamed. Older references to 'hunter stamina' in this document mean Essence; any earlier implications that it limits combat or encounters are superseded. Essence's in-world magical origin is undecided.


## Working design: return windows, persistent encounters, and location-specific skill familiarity (2026-10-23)
- Significant creature encounters have persistent individual identities and last-known locations. A player short on Essence can go home and retrace the route to the **same creature**, rather than triggering an unrelated reroll.
- **Two phases:** for a limited, generally undisclosed initial return window (illustrative example: 15 minutes, NOT approved final duration), returning to the encounter location finds that individual still there; this does **not** guarantee successful capture. After that window, the creature may have moved or faced environmental threats. Players can follow tracks, discover evidence of its fate, or lose the trail.
- Return travel is still branching exploration: obstacles, shortcuts, and optional diversions can affect whether the hunter arrives in time. Need to resolve consistency between guaranteed location window and extraordinary threats during that window.
- **Scope undecided:** apply persistent world behavior broadly, but consider stronger, longer-lived individual records for significant/rare/legendary encounters and lightweight persistence for common encounters.
- **Skill XP familiarity:** repeat attempts at the **same exact challenge at the same location** grant diminishing skill XP and eventually **exactly zero**. A genuinely different tree, cliff, mountain or challenge has its own fresh XP opportunity in the relevant skill (e.g. Climbing). The reduction should occur quietly without explicit XP-decay announcements. Exact decay curve, zero threshold, challenge identity and changed-environment exceptions remain open.
- This is design discussion, **not implemented or tested** in the alpha engine.


## Geography consistency and tracking stone discussion (2026-10-23)
- **Core world constraint:** Pet Hunter has a persistent, internally mapped geography despite being a text-only exploration experience. Landmarks and geographic connections remain stable between visits; encounters, obstacles, conditions and narrative choices can change. Travel in reverse should follow actual traversable connections, not randomly regenerate an unrelated geography.
- Retracing a creature sighting is possible through known routes without memorizing identical choice sequences.
- **Working item proposal, not yet explicitly approved as final:** craftable, reusable tracking stone holding one active marked location at a time. It helps indicate which text choices move toward that fixed location, but does not teleport, freeze the creature, or guarantee capture. Replacing a mark overwrites the old mark; exact crafting requirements remain open.


## Approved early-game tracking stone clarification (2026-10-23)
- The fixed world map does **not** tell players where a randomly encountered creature appeared. An encounter can occur at a random precise location along a stable geographic route.
- Hunters can **mark the exact encounter location** using a tracking stone. The engine remembers the marked position and indicates, through a **yellow glow on relevant text choices**, which paths guide the player back toward it. This guides navigation without teleporting, moving the map, or guaranteeing the creature remains there.
- **Craft the tracking stone once**, early in the game after gathering the required minerals; no advanced crafting-level gate. It is **reusable indefinitely** and is not consumed when marking. Current working capacity is one active location mark at a time, overwritable; final capacity can be revisited if needed.
- The mark identifies the **original encounter spot**, not a moving creature's live position. Within its return window the same individual is there; after expiration, tracking/evidence/world outcomes apply.
- The exact mineral recipe and stone UI implementation remain undecided. Not yet implemented in alpha.


## Tracking stone: general use and expiring guidance (2026-10-23)
- The reusable tracking stone is **not restricted to legendary creatures**. It can mark other encounter locations as well; legendary was only an example.
- An activated mark has a **limited return window** (duration not yet fixed). While active, relevant text choices show yellow-glowing directional guidance toward the marked encounter location. No visible countdown is required.
- **When that timer expires, the yellow guidance disappears, the mark deactivates, and the reusable stone returns to the player's inventory** for reuse. The stone does not preserve a creature at its location indefinitely.
- Expiry of the mark does not mean the creature ceases to exist; it may continue moving or interacting with the world. Exact timing and whether a player can still follow ordinary environmental clues after mark expiry remain to be balanced.
- This is an approved design direction, not yet implemented.


## Smart stone timer clarification (2026-10-23)
- **The smart/tracking stone does not have an independent timer.** Its guidance is tied directly to the marked creature's **species-specific time window for remaining at that exact encounter location**.
- The mark expires when that creature's remaining stay window ends, even if the player placed the stone after the creature had already been there for some time. Example: a 15-minute location stay with 5 minutes already elapsed leaves 10 minutes of guidance.
- On expiry, the yellow text-choice guidance ends, the mark deactivates and the reusable stone returns to inventory. The creature is no longer guaranteed to be there; it is not deleted from the world.
- Actual stay durations per species are still undecided. This clarification supersedes any implication that the stone has a separately configurable duration.


## Corrected encounter-window rule (2026-10-23) — supersedes species-specific timer notes
- Creatures spawn in the persistent world and behave naturally; branching narrative encounters are determined by exploration circumstances.
- **A return window begins when the player encounters a creature**, regardless of species, rarity, or whether the player attempts to capture/tame it.
- During the window, the encountered individual remains available at that exact encounter location. The window exists **with or without a smart stone**. A 15-minute window is an illustrative duration, not yet final balance.
- A placed reusable smart stone **only helps navigate back** to the encounter spot via yellow-highlighted text choices. It neither creates, pauses, nor extends the encounter window.
- At window expiry, the creature is no longer guaranteed at the location and may move or interact with the world; if marked, the stone deactivates and becomes available again.
- **Do not use species-specific or rarity-specific timers as an assumed rule.** The previous species-specific timer interpretation was incorrect and is superseded by this section.
- Implementation and playtesting are pending.


## Sanctuary biome portals (approved core, 2026-10-23)
The sanctuary includes one portal for each biome: Autumn, Spring, Summer, Winter. Portals are a sanctuary-based way to begin biome expeditions, with engine-defined arrival locations. This does not imply a player map or unrestricted in-biome teleportation. Craftable return portal stones remain a separate feature whose interaction with these permanent sanctuary portals needs clarification. Exact portal unlocks, costs, and arrival locations TBD.


## Decision 029 — Sanctuary-crafted portal stones and Essence Potions (approved, 2026-10-23)
- **Both portal stones and Essence Potions are crafted at the player's sanctuary.** They are preparation items, not wilderness crafting actions.
- Sanctuary has a portal associated with each of Autumn, Spring, Summer, and Winter. Players use crafted portal stones to enter a selected biome from the sanctuary through its corresponding portal.
- During exploration, portal-stone travel returns the player **directly to their sanctuary**. No free selection of arbitrary wilderness destinations.
- A player without a usable return stone may need to travel home through engine-approved physical routes. Low/zero Essence does not prevent travel, creature interaction, combat, or XP; it only blocks Essence-gated acquisition attempts until restored.
- Engine governs portal availability, destinations, items, and location changes; LLM narration cannot bypass these rules.
- **Still undecided:** whether stones are consumed on use, whether outbound and inbound use the same stone/item count, crafting recipes, portal unlocks, and exact biome arrival positions.


## Decision 030 — Portal stones are consumed on use (approved, 2026-10-23)
Each successful portal-stone travel action consumes **one** crafted stone, whether traveling outward from the sanctuary into a chosen biome or returning from exploration to the sanctuary. A round trip entirely by portal requires two stones. Players without a stone can return by physical travel. Stones are craftable at the sanctuary only. Do not infer recipe or cost yet; the engine must enforce the inventory deduction and destination change.


## Decision 031 — Fixed biome portal arrival locations (approved, 2026-10-23)
The sanctuary's four biome portals each have exactly one persistent arrival location in their respective biome. Every player using the same biome portal arrives at that same location. The engine owns these fixed destinations and subsequent world navigation; the LLM cannot randomize arrival points or create extra portal destinations. Arrival locations and safety characteristics are TBD. A successful portal activation consumes one crafted stone.


## Decision 032 — Relatively safe portal arrival zones (approved, 2026-10-23)
Each fixed biome portal arrival point provides a reasonably safe opportunity for the player to orient themselves. Wildlife and environmental conditions continue to exist around arrival locations, and ordinary world simulation remains active. Do not make portal arrivals fully immune to danger or deliberately expose arriving players to immediate unavoidable threats. Threats emerge from engine-tracked terrain, weather, creatures, and circumstances; no arbitrary invisible danger-ring is approved. Specific arrival-site layouts and risks are TBD.

## Waypoint Stone correction and first expedition test plan (2026-10-23)
- **Approved correction:** The item is named **Waypoint Stone**, not smart/tracking stone. Its crafting recipe is **locked behind reaching a certain crafting skill level**, not immediately available to beginners. Exact level and ingredients remain open. Once crafted, the stone is reusable indefinitely; players do not repeatedly craft it.
- It guides toward one marked encounter location while that encounter's return window is active. The return window starts on encounter regardless of marker, rarity, or species; the marker expires with that window. Earlier notes describing early access without a skill gate are superseded.
- **Next testing milestone:** a compact expedition **within Autumn**, exercising consistent geographic connections, a creature encounter, departure and return during its window, and eventually Waypoint Stone guidance. The stone's skill unlock must be tested separately; it must not be given automatically at game start.
- Existing prototype and engine tests still model older home-biome selection and do not yet test fixed-location encounters or the Waypoint Stone. Do not claim those mechanics are implemented or verified.

## Decision 039 — Hybrid skill-gated environmental actions (approved)
During exploration, hidden opportunities remain undisclosed until the hunter has sufficient knowledge/recognition to perceive them. Obvious obstacles can show unavailable actions when requirements are unmet. Eligible risky actions may still fail: recognition, eligibility, and outcome resolution are separate engine-authoritative steps. Skills, equipped items and current environmental state are inputs. Exact thresholds, formulas, gear lists, UI treatment and tests remain open. Related: world/BIOMES.md.
