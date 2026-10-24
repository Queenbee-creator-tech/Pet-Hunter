# Player Health, Injury, Death & Respawn — Design Decisions

Date: 2026-10-23
Status: PARTIALLY APPROVED DESIGN — NOT IMPLEMENTED OR TESTED

## Approved
- Player characters can die as a consequence of dangerous encounters, environmental hazards, and decisions, resolved by the authoritative engine.
- On death, the current fatal encounter ends and its unfinished rewards/opportunities are forfeited.
- Progress successfully earned **before the fatal encounter** persists: previously acquired creatures, completed discoveries, collected items/resources, and earned progression.
- Players respawn rather than permanently losing their character. The intended respawn location is the sanctuary or an eligible spawn point; the exact selection rule remains undecided.
- The AI narrator describes the specific circumstances of death and awakening/return in immersive, varied prose rather than merely displaying a generic death screen. The engine alone determines death, encounter termination, state preservation, and respawn.

## Narrative example (illustrative, not a fixed script)
> Your vision fades as the creature disappears into the blizzard.
>
> Moments later, you awaken beside a familiar portal. Your expedition has ended, but everything you accomplished before that final encounter remains yours.

Death by falling, creature attack, cold, or currents should receive context-specific descriptions consistent with engine facts. The prose is presentation, not world-state authority.

## Proposed / open — NOT approved as rules
- Replace a traditional numerical hunter health bar with a condition/injury model (healthy, minor, serious, critical, with specific injuries such as sprains or hypothermia). The user expressed concern about health-bar complexity in a text adventure; no final health model chosen.
- Whether injuries persist through respawn, how they are treated, and whether they impose skill/movement penalties.
- Respawn selection: automatic nearest eligible spawn point, sanctuary-only, or player choice; definitions and activation requirements for spawn points.
- Whether an unfinished acquisition or item use within the fatal encounter is rolled back; define transaction boundaries and exploit-safe saving.
- Whether a fatal encounter's creature continues to exist in the persistent world, independently of the player's lost opportunity. Do not equate encounter termination with deleting a world creature.
- Death/spawn magic and its lore, including whether a death return consumes any resources.
- No corpse-retrieval system is currently required by the approved direction; do not invent inventory dropping or permanent loss of prior completed progress.
- Death respawn is NOT automatically a normal crafted Portal Stone activation. Existing portal travel rules consume one crafted stone per successful voluntary use; death-respawn costs are separate and unapproved.

## Implementation guardrails
- Record completed progress at clear encounter boundaries; resolve fatal encounters atomically so reloads/retries cannot duplicate rewards.
- Narrator cannot award loot, invent a rescue, alter player health, or select an unapproved respawn destination.
- Keep hunter injury/health distinct from Essence (reward-acquisition resource) and creature stamina/injury.
- Future tests should cover fatal hazards, prior-progress retention, unfinished encounter forfeiture, consistent respawn, and narrative fidelity.

Related: docs/GAMEPLAY_LOOP_AND_WORLD_SIMULATION.md, docs/ARCHITECTURE.md, world/BIOMES.md.
