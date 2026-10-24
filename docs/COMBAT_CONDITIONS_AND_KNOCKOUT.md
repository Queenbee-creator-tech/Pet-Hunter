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

## Knockout persistence and encounter loss (approved)
- Any creature knocked out at 0 HP remains owned and present in creature inventory/party storage, but is unusable until appropriate care and recovery; it retains its injured/unconscious condition.
- If the hunter is knocked unconscious during an encounter, that encounter ends and the player forfeits opportunities/rewards from that encounter only.
- All creatures (including knocked-out ones), equipment and items already collected on the expedition accompany the hunter to the chosen sanctuary or nearest portal.
- Persistent state does not reset during return: armor retains damage; creatures retain injuries, unconsciousness, fatigue, fear and stress as applicable. Previously acquired expedition loot is retained.
- Party creature abilities may influence overworld travel (e.g. suitable avian creatures improve travel speed, aquatic creatures improve swimming/traversal). Exact species abilities and traversal rules to be approved in species design; do not assume universal mounts or transport capabilities.

## Combat availability and autonomous reactions (approved clarification)
- ONLY knockout/unconsciousness (0 HP) makes a creature unavailable to fight. Injuries, fatigue, fear, and stress alone do NOT prohibit participation in combat.
- These conditions instead modify probabilities of following the hunter's commands and can trigger autonomous, instinctive actions (inspired by XCOM turn-based panic/stress behavior): e.g. hesitate, defend, freeze, retreat, or act independently. Specific action tables and probabilities remain TBD.
- Training improves the likelihood of responding appropriately to commands under fear/stress; bond and temperament may also influence response. Do not interpret these conditions as automatic refusal or lockout.
- Creature travel benefits are passive party bonuses, not necessarily riding or physically transporting the hunter. Species-appropriate examples include bird-associated faster travel and aquatic-associated swimming benefits; specific eligibility and stacking TBD.

## Trainable behavioral responses (approved clarification)
- Fear/stress-triggered independent behaviors (freezing, fleeing, hesitation, other instinctive reactions) can be progressively reduced through training; they are not immutable penalties.
- Training improves self-regulation and command reliability under pressure without erasing species temperament or personality.
- High training can make independent panic responses very unlikely, but exact caps and whether absolute immunity is achievable are not yet specified. Avoid locking numerical rates.

## Still to design
- Knockout recovery costs or other consequences beyond destination choice (not established).
- Whether an unconscious creature is carried, automatically retrieved, or handled by another rule.
- Exact probability formulas, injury severities, recovery duration, treatments, item effects and training progression.
- UI animations, battle presentation and persistence of status conditions.

## Implementation status
Design recorded only. Combat and care systems are not yet implemented in the prototype.
