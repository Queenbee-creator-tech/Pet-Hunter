# Breeding and genetics design notes (2026-10-24)

## Approved gameplay
- The breeding room allows multiple pairs simultaneously, without a global pair cap. Each individual creature may join only one active pair.
- Breeding attempt lasts 2 real-world minutes. A successful attempt produces an egg in the incubation room's egg inventory, but does not automatically start incubation.
- Each participating creature has its own 5-minute cooldown measured from the end of breeding, even if the attempt fails. Switching partners cannot bypass cooldown. Time advances while offline.
- Incubation is separate: three incubators, one egg per slot, 2-minute timer, manual Hatch Egg action.
- Two Legendary parents do not guarantee a Legendary offspring. Rarity outcome probabilities are not finalized.
- Species determines baseline characteristics and allowed traits; rarity and mutations are distinct. A Common mutation may be bred into a Legendary lineage.
- No unapproved species or hybrids can be created by the game. Cross-species breeding and hybrid outcomes must draw only from approved species/hybrid entries once the catalog is developed.
- Future visuals: modular approved interchangeable features (Option B), not unconstrained per-egg AI images.

## REMINDER for species development
When designing each species, define its approved visual modules (colors, markings, tails, horns, wings, attachment points), mutation traits, inheritance rules, incompatible combinations, trait limits, species-specific stats and rarity distribution. Decide how approved hybrid forms are represented. Do not finalize these during the alpha breeding-room implementation.

## Alpha implementation limitations
- Temporary 80% breeding success probability; not an approved balance value.
- Placeholder captured and hatched creatures have species 'Unknown creature' and Common rarity; this is not the final catalog.
- The prototype currently selects a parent species and rarity for successful offspring; proper rarity inheritance, mutation transfer, and hybrids await the species database.
- Creature inventory migration converts legacy aggregate creature counts into individual placeholder creature records.


## ARK-inspired breeding and genetics direction (2026-10-24)
- ARK is the reference for selective breeding, inherited stat strengths, generational lineages, genetic variation and mutations—not an approval of ARK's manual level-up stat allocation.
- Design separate heritable stat potential from acquired combat levels, temporary injuries, fear, stress and exhaustion. Combat damage must not change inheritable genetics.
- Offspring should be able to inherit desirable stat tendencies from either parent, with potential for recombination and variation; exact probabilities, stat ceilings, mutation rates and inheritance formulas remain undecided.
- Combine performance genetics with approved modular appearance traits (horns, wings, tails, color, markings) when species art and genetics are designed.
- Existing rules still apply: mutations are separate from rarity; crossbreeding is allowed only within approved species/hybrid catalog; offspring rarity not guaranteed by parents' rarity; max creature level 50 does not imply numeric stat cap 50.
- Do not copy ARK's exact formulas or lock unapproved mechanics.

## ARK-inspired breeding and genetics direction (approved concept, formulas TBD)
- ARK is the main conceptual reference for depth of selective breeding and genetics, NOT necessarily for player-directed level-up stat allocation or the entire progression system.
- Explore offspring inheriting different stat potentials from each parent, selective breeding over generations, individual variation, traceable lineages and genetic mutations.
- Distinguish inherited genetic potential from temporary condition and trained/current stats. Whether and how gained levels affect inheritance remains a balancing decision, not a locked formula.
- Adapt these ideas to Pet Hunter's approved rarity system, crossbreeding rules, mutations independent of rarity and modular species traits. Do not copy ARK's exact rates, caps or formulas without user approval.
- This is a design direction only; no numeric inheritance or mutation mechanics approved by this note.

## Wild capture vs bred offspring progression (approved clarification)
- Captured wild creatures KEEP their encounter level (e.g. wild level 25 captured -> owned level 25). Wild level cap 50.
- Bred/hatched offspring ALWAYS begin at creature level 1 regardless of parent levels.
- Bred offspring inherit stat potential/genetic traits from parents and develop their own current numerical stats as they level; inherited potential is distinct from current trained stats.
- Hunter progression is skill-based (skills start at level 1 and cap at 50), rather than requiring a separate overall hunter level. Creature skills likewise cap at 50.
- Breeding-exclusive level cap of 60 is under discussion/proposed, NOT yet final. How inherited potential interacts with that cap is TBD.
- Preserve individual wild stat variation and species-specific ranges; no exact stat formulas approved.

## Approved weighted stat inheritance probability (2026-10-24)
- For each inherited genetic stat independently, offspring have a 55% chance of inheriting the higher parent's genetic stat potential and a 45% chance of inheriting the lower parent's potential (ARK-inspired).
- This is inheritance of genetic potential, NOT current HP or trained/leveled stat gains. Bred offspring still hatch at level 1.
- Equal parental values produce that shared value; no meaningful higher/lower distinction.
- Rarity inheritance and mutations use separate mechanics, still TBD.
- This rule is approved for design; implementation and balancing tests remain pending.

## Creature levels versus trained skills — approved (2026-10-24)
- Overall creature level increases primarily through **exploration and combat experience**, not passive Care Room training.
- Care Room training primarily improves **specific creature skills** (such as swimming, tracking, or combat abilities) rather than raising overall creature level.
- Individual creature skills have their own progression, with the previously approved skill cap of 50; a creature's skill level can differ significantly from its overall creature level.
- Inherited genetic potential influences numerical stat development as the creature gains overall levels; it is separate from both current trained skills and experience.
- Exact XP awards, diminishing-return behavior, training durations, and the amount (if any) of overall XP granted by training are not yet finalized.

## Creature XP sources — approved direction (2026-10-24)
- **Combat participation is the primary source** of overall creature-level experience.
- When the hunter earns skill XP through exploration, **accompanying creatures receive a small amount of overall creature XP**. This does not automatically raise the creatures' corresponding individual skills.
- Care Room training remains primarily for targeted creature skill XP, not overall level XP.
- Exact exploration XP share/percentage, combat participation thresholds, XP splitting and anti-exploit rules are not yet decided. The illustrative 100 hunter XP -> 5 creature XP is NOT an approved rate.

## Exploration XP distribution — approved (2026-10-24)
- Whenever the hunter earns exploration skill XP, **every creature currently accompanying the hunter in the expedition party** receives a small amount of overall creature-level XP, even if that creature did not directly assist with the specific action.
- Expedition party size is up to four creatures. Creatures remaining at the sanctuary (including those in care, rest, or training) do not receive expedition XP.
- Combat remains the main source of creature-level XP. The precise exploration XP rate remains TBD.

## Combat XP distribution — approved (2026-10-24)
- All creatures in the expedition party participate in combat and **all earn combat XP** for the battle.
- Combat XP includes a shared participation award plus **individual performance bonuses**. Creatures contributing more to the fight can earn additional XP, and delivering the final blow may grant an additional bonus.
- Meaningful non-damage contributions (such as defense or support) should count toward performance, not only damage output.
- Exact base awards, bonus amounts, weighting, eligibility and anti-exploit calculations are TBD. Any numerical examples discussed are illustrative, not approved balance values.

## Combat XP victory condition — approved (2026-10-24)
- Combat XP is awarded **only if the hunter's team wins the battle**. On victory, all four participating creatures receive the shared award plus applicable contribution/final-blow bonuses.
- If the team loses, **no creature earns XP from that battle**, regardless of actions performed before defeat.
- Previously earned exploration XP is retained. Battle consequences such as injuries, fatigue, fear, stress and equipment wear still persist after defeat under the approved knockout rules.
- Exact XP amounts and win-condition implementation remain to be designed and tested.
