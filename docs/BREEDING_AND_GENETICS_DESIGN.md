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
