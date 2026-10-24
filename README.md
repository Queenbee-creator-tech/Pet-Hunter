# Pet Hunter

**Pet Hunter** is a fantasy creature-discovery, hunting, taming, hatching, breeding, and raising game being developed as a **mobile-first web application**. Players explore a living world through branching text adventures, encounter creatures, gather resources, improve their hunter's skills, and care for creatures at their sanctuary. Creature combat is part of the planned game; multiplayer systems remain longer-term possibilities.

**Playable prototype:** https://queenbee-creator-tech.github.io/Pet-Hunter/

## Active development roadmap — integrated tutorial MVP

**Current milestone:** build and test the first complete playable experience inside the real Pet Hunter game. The tutorial is **not** a separate project, separate map, temporary engine, or disposable implementation. It is a guided journey using the same persistent Avalora world, player saves, creature systems, rules, and mobile-first interface that the full game will use. Tutorial progression adds guidance and unlocks; it must not fork core mechanics.

**Working tracker:** [Development Workflow Inventory](docs/DEVELOPMENT_WORKFLOW_INVENTORY.md). **Assistant/developer instructions:** [AGENTS.md](AGENTS.md). Consult both at the beginning of each development task and update them when progress or priorities change.

### Work through these stages in order (with necessary integration work as dependencies)

| Order | Workflow | Tutorial-ready acceptance test |
| --- | --- | --- |
| 1 — CURRENT | World metadata, generation and developer inspector | Approve grid scale/biome allocation; build geographic rules; generate and persist **one canonical Avalora**; inspect actual terrain/elevation/water/biome/route layers; validate connected forests, downhill rivers, lake outlets, waterfalls at elevation changes, fixed landmarks, accessible Autumn starter region |
| 2 | Player state and persistence | Create/load a hunter; save/reload location, inventory, creatures, timers, tutorial progress; prevent duplicate rewards |
| 3 | Exploration, routes, travel and interaction | Explore actual Autumn world cells/locations via text choices, discover a point of interest, handle engine-approved obstacles, travel back to sanctuary |
| 4 | Autumn creature content and encounters | At least one approved species with usable stats, habitat, behavior, encounter data and testable mutation support for the starter milestone |
| 5 | Combat and capture | Run an encounter to resolution; apply approved XP/win rules; make valid capture attempt and persist creature |
| 6 | Eggs, incubation, collection | Acquire/use egg via approved gameplay, select egg from collection, incubate/hatch using three-slot rules, inspect owned creatures |
| 7 | Sanctuary care, training and progression | Use approved three-slot timed care/training systems, claim completed results, preserve state across reload |
| 8 | Mobile-first UI and tutorial guidance | Connect real screens to real systems; unobstructed navigation, backpack, journal, sanctuary and encounter UI; guide player through real game |
| 9 | End-to-end QA and release | Fresh start → explore → encounter → combat → capture → sanctuary → care/training → egg/incubation → save/reload → continue in Autumn; test failures, mobile and persistence |

These are **work stages, not claims that all design details are finalized**. Implement dependencies in the correct order; UI work may proceed alongside engine work but must integrate before completion. The exact tutorial script and whether every listed activity is mandatory for graduation remain subject to approval. Do not remove already approved gameplay rules just to simplify the tutorial.

### Immediate next decisions — world workflow

1. Treat **256 × 256** as the selected *starting grid proposal*, pending confirmation of cell scale and biome allocation.
2. Agree meters per cell, movement/location granularity, coordinate axes and elevation units.
3. Agree biome footprints and whether Summer's ocean is inside the same grid.
4. Define terrain clustering and elevation-driven hydrology, including connected forests/groves, downhill river drainage, lake inlets/outlets, waterfalls at drops, and coastline/reef placement.
5. Define permanent landmarks, route graph, sanctuary arrivals, habitats, resources, hidden discoveries, hazard zones, generator seed/version and persistence schema.
6. Implement generator and **developer-only world inspector** reading actual saved world data; validate and fix before marking world workflow complete.

**Completion discipline:** Each workflow passes Design → Metadata → Implementation → Testing → Complete. Never equate documentation with functioning code. Maintain approved / proposed / unverified distinctions and update the tracker after each substantive change.

## Project status

**Early development / alpha prototype.** The current prototype is a small technical foundation, **not** a complete implementation of the gameplay design below. Many mechanics are approved as design directions but still need implementation, balancing, and testing. Species, recipes, exact durations, combat balance, and much of the worldbuilding remain provisional. **Approved design rules are not necessarily implemented in the playable build.**

## Player experience and gameplay loop

1. **Start in Autumn.** Every player begins with a sanctuary in the **Autumn Civilization**.
2. **Prepare at the sanctuary.** Care for creatures, manage resources and inventory, and prepare for expeditions.
3. **Explore through text choices.** Travel through a consistent fantasy world while narrative choices introduce discoveries, obstacles, resources, and creature encounters.
4. **Encounter and decide.** Observe, pursue, tame or acquire creatures when appropriate, gather materials, or move on. Outcomes depend on the game's rules and the player's situation.
5. **Return, recover, and progress.** Raise and train creatures, recover resources, develop hunter skills, craft equipment, and unlock further opportunities.
6. **Explore again.** New skills, preparation, and changing world conditions create different possibilities.

The goal is a **living world with stable geography**: the locations and their geographic connections remain consistent, while creatures, weather, events, and narrative obstacles can change. The branching text interface is **not** a randomly rearranged map.

## World, travel, and sanctuary

- The world is organized around **seasonal civilizations/biomes**. All players begin in **Autumn**; players do not choose a different starting biome.
- Traveling to other biomes depends on relevant **skills, equipment, resources, and conditions**. Exact requirements are not finalized.
- **Travel and relocation are different systems.** Moving the player's sanctuary to another biome requires both sufficient in-game money and the ability to meet that biome's survival/habitation requirements.
- The sanctuary is the player's home base for creature care, preparation, and recovery.
- The prototype uses **home-only stamina recovery** at +2 stamina per five real-world minutes, including elapsed time away from the app while the hunter is home. Current stamina values are prototype balancing choices, not final numbers.

## Expedition parties, return travel, and knockouts

- Hunters may explore with **up to four creatures**. Species-appropriate creatures can provide **passive exploration benefits** (for example, travel or swimming bonuses); exact bonuses are not yet defined.
- Normal return travel and the **Waypoint Stone's encounter-tracking function** are distinct mechanics. Crafted return travel follows its own established rules; the Waypoint Stone marks and guides the hunter back toward a previous encounter, rather than teleporting.
- At **0 HP**, hunters and creatures are **knocked unconscious**, not permanently killed. The hunter's view fades to black.
- After hunter knockout, the player chooses to recover at the **home sanctuary or nearest portal**, **without consuming a return stone**. Who or what transported the unconscious hunter is intentionally unexplained in the lore.
- Hunter knockout ends the current encounter and forfeits opportunities and rewards from **that encounter only**. Previously collected expedition items and all accompanying creatures return with the hunter.
- Equipment damage and creature conditions **persist** through recovery travel. A knocked-out creature remains owned but cannot be deployed until medically treated and recovered.

These rules are **approved design**, not yet a completed expedition or combat implementation.

## Creature encounters and the Waypoint Stone

- Creatures spawn in the world and behave within its environment. Text-adventure circumstances can lead the player to a creature at a particular location.
- **Each encountered creature gets a return window beginning at the encounter**, whether the player attempts to tame it, cannot tame it, or chooses to leave. The window applies regardless of rarity or species and **does not require a marker**.
- During that window, the player can return to the **same encounter location** and find that creature. **15 minutes is an example, not a finalized duration.**
- A **Waypoint Stone** is an **indefinitely reusable** navigation tool unlocked when the hunter reaches a required **crafting skill level**. Once unlocked and crafted using the necessary materials, it does not need to be crafted again. The exact level and recipe are not yet set.
- A marked encounter can be retraced using **yellow-highlighted text choices** that lead toward the recorded location. The stone does not teleport the player, capture the creature, or extend its encounter window.
- When the encounter window ends, the yellow guidance disappears, the mark deactivates, and the stone becomes available for reuse. The creature is no longer guaranteed at that exact spot; it is **not deleted from the world**.
- The working design uses **one active mark at a time**. The precise recipe, interface, and final encounter duration remain to be determined.

## Creature care and combat conditions — approved design

- Combat wear and tear depends on the **relative levels of opponents**, actual damage and remaining HP, energy expenditure, and repeated deployment without recovery. Strong creatures may emerge from easy fights completely fine; **care is not mandatory after every fight**.
- Injuries, fatigue, fear, and stress **do not make a conscious creature ineligible for combat**. Instead, they can increase the probability of hesitation, panic, independent action, or failure to follow commands, inspired by **XCOM**.
- Fear and stress arise from combat/environmental events and overuse; they are **not permanent timid personality labels**. Training and recovery can resolve them.
- Sanctuary **medical care** addresses injuries and physical recovery; **training** helps resolve fear/stress; **rest/bedrooms** restore energy and relieve exhaustion. Exact recovery times, items, and probabilities remain undecided.
- The **game engine**, not AI narration, determines conditions, probabilities, and actions. AI may describe the consequences.

## Skills and progression

- Exploration activities can develop hunter skills, such as climbing.
- Repeating **the exact same challenge at the same location** gives diminishing skill experience until it awards **zero**. A genuinely different challenge can provide fresh experience.
- Skill progression can help unlock routes, overcome hazards, and support travel to more demanding environments.
- **Hunter progression is skill-based:** hunter skills begin at Level 1 and cap at **50**, without requiring a separate overall hunter level.
- **Creature skills** cap at **50**. **Wild creatures** can be encountered up to **Level 50** and **retain their encounter level when captured**.
- **Bred offspring always hatch at creature Level 1.** A breeding-only creature cap of **Level 60** is the current direction, with final cap behavior/balancing still to be confirmed.
- Numerical attributes such as HP, attack, and energy are **not capped at 50**. Species and individual inherited genetics influence stat potential and development.
- Exact experience formulas, thresholds, skill trees, and numerical stat ranges remain open for design and testing.

## Breeding and genetics — approved direction

- Breeding takes inspiration from **ARK's selective inheritance**: offspring can inherit strong genetic stat potential from different parents rather than automatically averaging their values.
- For **each genetic stat independently**, the approved starting probability is **55% to inherit the higher parental genetic value** and **45% to inherit the lower**. Equal values produce the same inherited value. These probabilities require implementation and balance testing.
- Inherited **genetic potential is separate from trained/current stats**. Offspring start at Level 1 and develop their inherited potential through progression.
- Rarity inheritance and mutations are **separate systems**; mutation is **independent of rarity**. Two Legendary parents are **not guaranteed** Legendary offspring. Exact rarity and mutation probabilities are not finalized.
- Creature appearance genetics will use **approved modular species traits** (e.g., interchangeable visual parts) when species are designed. Hybrid offspring must be supported by approved creature designs; the engine must not invent unapproved species.
- The prototype currently supports basic egg storage, **three incubator slots with one egg per slot**, manual incubation/hatching, and a preliminary breeding room with individual creatures and cooldowns. These are **prototype mechanics**, not the complete genetics system.

## Creatures and longer-term scope

- The current rarity color scheme is **Common, Uncommon, Rare, and Legendary** (rarity colors beyond those explicitly approved should be verified before implementation). Creature rarity and mutation rarity are separate concepts.
- Creatures may be discovered, tamed, acquired as eggs/offspring where appropriate, hatched, raised, trained, and eventually used in combat.
- Autumn creatures, species rosters, actual genetic stat calculations, mutation probabilities, growth balancing, creature care, and combat remain under development. Earlier roster counts and biome themes should not be treated as locked requirements.
- Future multiplayer creature battles and contested bounty encounters are **not part of the initial playable slice**.

## Technical direction

- **Mobile-first web app**, also usable on desktop.
- **Game engine separate from the interface** so rules can be tested independently.
- **Branching text-adventure exploration** with a later visual sanctuary and character/skills screens.
- Persistent save/resume behavior.
- The game engine determines valid actions, costs, and outcomes. An AI narrator, if used, may describe events but **must not override gameplay rules or invent rewards**.
- Build and test a small, enjoyable gameplay loop before expanding the world or graphics.

## Repository documentation

- [Gameplay loop and world simulation](docs/GAMEPLAY_LOOP_AND_WORLD_SIMULATION.md)
- [Development checklists](docs/DEVELOPMENT_CHECKLISTS.md)
- [World and biomes](world/BIOMES.md)
- [Creature system](creatures/CREATURE_SYSTEM.md)
- [Species template](creatures/SPECIES_TEMPLATE.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Development roadmap](docs/ROADMAP.md)
- [Breeding and genetics design](docs/BREEDING_AND_GENETICS_DESIGN.md)
- [Combat conditions and knockout rules](docs/COMBAT_CONDITIONS_AND_KNOCKOUT.md)

**Documentation note:** Some older documents and prototype screens may still describe superseded ideas (such as choosing a starting biome). The newer approved gameplay decisions take precedence until those files and the prototype are updated.
