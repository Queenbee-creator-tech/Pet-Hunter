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
