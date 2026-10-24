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

## Correction: XCOM-style acquired combat fear/stress (approved clarification)
- Creatures do NOT enter combat inherently frightened or stressed because of a fixed timid personality. Fear and stress are conditions ACQUIRED through events in combat or the environment (e.g. stronger enemies, heavy damage, ally knocked unconscious), based on engine calculations.
- An affected creature can panic or act independently during combat; the condition can persist afterward and be addressed through sanctuary recovery and training. Once treated/trained through, the acquired condition is cleared, rather than being a permanent species personality flaw.
- Do not require fear training as a prerequisite for normal command-following in an unaffected creature. Training can prepare for stressful encounters and rehabilitate acquired fear/stress.
- Earlier speculative text about inherent species timidity/temperament governing fear should NOT be treated as approved design. This correction supersedes that interpretation.

## XCOM-style overdeployment and recovery loop (latest approved clarification)
- The central source of fatigue, stress, fear and injury risk is repeated deployment / overplaying creatures relative to their remaining stamina/energy, alongside the demands and events of combat. Creatures need not start combat with negative conditions.
- Continuing to deploy tired, injured, stressed or fearful creatures is permitted; those conditions increase the chance of failing to follow orders or acting independently, as in XCOM. Only 0-HP unconsciousness blocks deployment.
- Sanctuary facilities clear corresponding acquired conditions: sleeping quarters/bedroom for tiredness, training for fear and stress, medical area for injuries, and medical care/recovery for unconsciousness. Exact recovery timings, costs, thresholds and probabilities TBD.
- The intended loop is optional strategic recovery after exertion, NOT mandatory constant pet maintenance. Recovered creatures return to normal behavior without permanent fear/stress penalties.
- This latest clarification supersedes earlier suggestions that stress/fear must be inherent temperament traits or that injured creatures cannot deploy.

## Combat wear-and-tear and recovery loop (latest approved clarification)
- XCOM-style deployment strain: repeated use of creatures without recovery, particularly with depleted stamina/energy, can cause or worsen tiredness, stress, fear and injuries. These conditions may also arise from especially difficult encounters and damage sustained.
- Relative combat levels matter to risk: a level 10 creature defeating a level 20 enemy should have meaningful probability of consequences based on the actual damage/energy used; a level 45 defeating a level 20 generally emerges fine if the fight was easy. Level comparison is not an automatic injury rule; consider actual combat events.
- Deploying an already injured, stressed, frightened or tired creature is permitted but increases the probability of independent reactions / failure to obey commands. Only unconsciousness at 0 HP makes a creature unavailable.
- Sanctuary recovery resolves temporary conditions: medical area treats injuries/physical health; training area resolves fear/stress; bedroom/rest restores energy and exhaustion. Recovering from a condition is distinct from permanent progression of combat training.
- No constant upkeep requirement for creatures who are not being overworked or endangered. Healthy strong creatures can finish combat without any care requirements.
- Specific formulas, thresholds, treatment durations and recovery items remain TBD, not approved numeric rules.

## Progression level cap (approved)
- Maximum hunter/player level: 50.
- Maximum creature level: 50.
- Maximum hunter skill level: 50.
- Maximum creature skill level: 50.
- Level caps do NOT imply numerical attributes (HP, attack, defense, energy, etc.) are capped at 50; stat values and scaling are separate design decisions.
- Implement the cap consistently in progression systems when those systems are built. Existing prototype mechanics may use provisional thresholds and are not automatically updated by this design record.

## ARK-inspired creature stat scaling (approved concept; formulas TBD)
- Level 50 is the creature/player/skill progression cap, NOT a cap on numerical stats such as HP, attack or energy.
- Use an ARK-inspired model: species-specific base stats and ranges; individuals of the same species and level can have different distributions/strengths.
- Determine per-species min/max numerical stat values and how level gains, inherited genetics, rarity and mutations affect them in later balancing work. Mutations remain independent of rarity.
- No sample stat numbers or exact allocation formulas are canon yet. Do not copy ARK formulas automatically; use the concept and tune for Pet Hunter.

## Still to design
- Knockout recovery costs or other consequences beyond destination choice (not established).
- Whether an unconscious creature is carried, automatically retrieved, or handled by another rule.
- Exact probability formulas, injury severities, recovery duration, treatments, item effects and training progression.
- UI animations, battle presentation and persistence of status conditions.

## Implementation status
Design recorded only. Combat and care systems are not yet implemented in the prototype.

## Care Room and Codex interface — approved design (2026-10-24)
- The Codex/Travel Journal is the read-only place to inspect the hunter and every owned creature's stats, skills, level, rarity, genetics, mutations, and condition.
- The Care Room is an interactive facility, using the same graphical slot-and-dropdown selection pattern as the Incubation Room. Occupied slots show the assigned creature and relevant care/training state.
- The care selection list should include **only creatures with actual care needs** (e.g., injury, low energy, stress/fear), not all healthy inventory creatures.
- Training is opt-in: the player **manually transfers a creature to the training area**, including a healthy creature. Training should not force a medical-care requirement.
- Codex and Care Room share the same underlying creature records; changes made by care or training appear in the Codex without duplicate state.
- Exact number of care/training slots, durations, and user-interface details remain to be decided; this is design, not yet implemented.

## Care Room training sessions — approved (2026-10-24)
- Training uses **timed sessions**, not interactive mini-games or required training challenges.
- The player manually assigns an eligible creature to a training slot and selects a skill the creature can learn, then starts the timer.
- Once the session finishes, the creature earns **XP in that selected individual skill**, rather than overall creature-level XP.
- The player may leave the Care Room and continue other activities while the session runs; session timing must persist through navigation and save/resume.
- Exact session duration, number of simultaneous training slots, XP awards, and whether collection/completion is automatic remain undecided.

## Training session duration — approved (2026-10-24)
- Each Care Room skill-training session lasts **2 real-world minutes**, matching the incubation timer duration.
- The session timer persists when the player navigates elsewhere or resumes a saved game.
- Completion awards XP toward the selected creature skill, not its overall creature level.
- XP amount, slot capacity, and whether the player must manually collect the completed session remain TBD.
