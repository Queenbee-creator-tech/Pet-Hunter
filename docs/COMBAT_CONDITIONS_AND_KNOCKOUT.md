# Pet Hunter — Combat Conditions and Knockout (approved design, 2026-10-24)

## Confirmed decisions
- Hunters and creatures do not die at 0 HP: they become unconscious / knocked out.
- Creature at 0 HP visibly collapses and lies unconscious; it cannot fight or perform strenuous actions until medical treatment and recovery are complete.
- Hunter at 0 HP experiences a fade to black, with sensory narration (e.g. 'Everything went black'). The return location and rescue mechanism must be narratively justified; no unexplained teleport/respawn.
- After combat, the deterministic game engine evaluates opponent level vs creature level, HP lost / remaining, energy consumed, combat training / fear resistance, opponent strength and injuries. It computes probabilities of injury, fear, stress, and exhaustion. Strong creatures can finish unscathed; care is not mandatory after every fight.
- Fear and stress are primarily combat conditions; training improves coping/resilience. Bond influences cooperation. Rest, medical treatment and appropriate items address different conditions.
- Conditions may co-occur. HP and injuries are not interchangeable; medical recovery may be necessary even after HP restoration.
- AI may narrate conditions and reactions but MUST NOT independently decide outcomes, change HP, assign injury or override probabilities. Engine is authoritative.

## Exploration party and hunter knockout travel (approved)
- Hunters may bring up to four creatures when exploring.
- Normal return travel uses the previously established crafted return stone / waypoint mechanics; do not replace or consume these on knockout.
- On hunter knockout (0 HP), fade to black and offer a choice: return to home sanctuary OR nearest portal. No stone is required or consumed.
- The lore explanation of who or what transported the unconscious hunter is intentionally unknown; do not invent a rescuer.
- Knockout transport is a recovery choice triggered by unconsciousness, not a freely usable travel shortcut.

## Still to design
- Knockout recovery costs or other consequences beyond destination choice (not established).
- Whether an unconscious creature is carried, automatically retrieved, or handled by another rule.
- Exact probability formulas, injury severities, recovery duration, treatments, item effects and training progression.
- UI animations, battle presentation and persistence of status conditions.

## Implementation status
Design recorded only. Combat and care systems are not yet implemented in the prototype.
