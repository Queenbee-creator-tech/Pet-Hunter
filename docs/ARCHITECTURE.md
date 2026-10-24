# Architecture: engine separate from interface

## Primary target: mobile
Pet Hunter is **mobile-first**. Initial playable interface: responsive, touch-friendly text adventure usable in a phone browser. A downloadable mobile app or 2D/3D visual client may be considered later; no commitment to a specific platform or engine yet.

## Separation
- **World/species data:** declarative definitions of biomes, creatures, biology, abilities, encounters.
- **Core game engine:** validates actions, resolves encounters and outcomes, advances growth, manages inventory/ownership and combat. It must not depend on buttons, screen dimensions, HTML, or a 3D renderer.
- **Game state/persistence:** player progress, owned creatures, growth and saved decisions.
- **Interface adapter:** converts touch/text choices into engine actions and turns engine results into readable narrative and UI.

Conceptual flow: Mobile text UI → action command → core engine ↔ world data / saved state → result → mobile UI.

## Mobile-first constraints
- Portrait-friendly layout, responsive widths, comfortable touch targets, legible text.
- No gameplay action should require hovering, a keyboard, or mouse precision.
- Keep encounters usable in short sessions; ensure state can be saved and resumed.
- Plan accessible contrast and screen-reader-friendly labels.
- Do not couple game rules to animations or graphics.

## Future interfaces
The same engine should be callable from another client (2D/3D or app) with minimal rule changes. Rendering and control schemes may change; game logic stays authoritative.


## Critical events and narrator authority (design requirement)

The game engine is the single authority for world geometry, player position, event triggers, permitted actions, skill/equipment checks, random rolls, and resulting state. The LLM is a presentation/narration layer; it cannot independently cause a fall, invent a rescue route, steal an item, kill a character, or determine success.

Proposed engine event contract: `event_id`, `event_type`, `player_location`, `scene_facts`, `urgency`, `available_reactions[]` (each with a stable action ID and eligibility), `resolution_rules`, and `result`. The interface submits an action ID; the engine validates it against current state and resolves the result; the narrator describes the validated event and result. Multi-stage critical events may transition to subsequent event states. Do not accept the narrator's text as authoritative commands or world mutations.

Candidate cases for tests: cliff fall with/without a reachable branch; pitfall and escape; equipment/skill changing odds for the same action; invalid reaction rejected; NPC thief detection/recovery without arbitrary inventory mutation; event persistence across interrupted sessions. Real-time countdowns, injury/death outcomes, and theft rules are not yet approved.


## Return travel resource validation (approved design direction)
The engine must support ordinary route-by-route return movement, craftable portal-stone automatic returns, craftable stamina potions, and stamina-gated voluntary encounters/actions. Ordinary return movement is not prohibited solely by insufficient stamina. Before presenting a stamina-costing voluntary action, validate the player's current stamina; after potion use, recalculate eligibility. Portal-stone destinations, inventory costs, crafting requirements and zero-stamina involuntary hazards are still open design decisions. Stamina regeneration at home/sanctuary: 2 per 5 minutes. Narrator text cannot bypass engine restrictions.


## Turn-based combat mode (approved direction)
Implement combat as an engine-controlled turn-based state machine separate from prose generation. On each turn, the engine exposes valid actions with stable identifiers and eligibility/cost information; the interface submits a chosen identifier; the engine validates and resolves the action, updates state, and returns a result for LLM narration. Combat must remain functional and deterministic in authority even when narration is unavailable. XCOM is a pacing/turn-based tactical reference, not approval of grid maps, cover mechanics, action points, or any specific XCOM rules. Exact turn and combat systems are undecided.

## Clarification — acquisition meter is not combat stamina (2026-10-23)
The hunter's currently named 'stamina' meter is **only for physical reward-acquisition attempts** (creature capture, egg collection, material gathering), not a general action-point, encounter, exploration, defense, combat, or XP gate. At zero, the engine still permits encounter participation, turn-based fighting, attempts to disable creatures, and character/skill XP; it rejects acquisition actions requiring resource. Any earlier reference to stamina-gated voluntary encounters or combat costs is superseded. Keep creature stamina distinct. The meter's permanent name and associated craftable potion name are undecided. Sanctuary recovery remains +2 per 5 real-world minutes.


## Decision 027 — Essence terminology (approved)
Rename the hunter acquisition meter in future implementation and UI from 'hunter stamina' to **Essence**. Rename its craftable recovery consumable **Essence Potion**. Engine validation: Essence gates physical reward-acquisition attempts (creature capture, egg collection, material gathering), not exploration, combat, defensive reactions, creature encounters, or character/skill XP. Home/sanctuary regeneration is +2 Essence per 5 real-world minutes; alpha maximum 20 is provisional. **Creature stamina** is a separate resource and keeps its name. Existing prototype identifiers may need a deliberate save-data migration; this is a design specification, not a claim of implemented changes.


## Decision 029 — Portal travel action contract (approved direction)
Portal stones and Essence Potions are craftable only at the sanctuary. Sanctuary portals correspond to the four seasonal biomes. Validate an outbound portal-stone action against the player's sanctuary position, selected biome portal, inventory and any approved unlock rules; validate an inbound portal-stone action against exploration state and return the player to their own sanctuary. Engine owns authoritative position updates and inventory accounting. No arbitrary in-world teleport destinations. Stone consumption, recipes, and destination coordinates remain open and must not be hardcoded as approved rules. At zero Essence, normal movement/combat/XP remain possible; Essence limits reward acquisition only.


## Decision 030 — Portal stone inventory transaction
Each successful portal travel activation requires and consumes one portal stone. This applies to outbound sanctuary-to-biome and inbound exploration-to-sanctuary actions. Reject activation when no stone is available; never deduct on an invalid/failed action. Validate inventory, consume one stone, and update authoritative location in a single reliable state transition so refreshes or repeated taps cannot duplicate travel or consume extra stones. Crafting recipe and arrival coordinates remain undecided.
