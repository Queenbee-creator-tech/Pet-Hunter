# Sanctuary Creature Collection, Care Room & Cooperation

Design decisions discussed 2026-10-24. **Approved design is not implemented or tested unless separately verified.**

## LOCKED / APPROVED DIRECTION
- Owned creatures belong to a persistent collection. Sanctuary habitat graphics display **up to four selected creatures** per habitat view; this is **not** the ownership limit.
- Within a habitat, the player may open a **nonpersistent collection dropdown/panel** to view owned creatures and choose which appear in the four graphical display positions. The collection panel is not permanently on screen.
- Sanctuary includes an **Outdoor Habitat**, **Specialized Habitats** suited to creature needs, a **Hatchery**, and a **Creature Care Room**. Detailed layouts and housing capacity are not locked.
- **The player manually chooses** which creatures enter and leave the Care Room. The game does not automatically assign a creature to care. Removing a creature returns it to the owned collection; unresolved conditions do not disappear merely because the creature leaves.
- The Care Room is for creatures needing recovery (injury, fatigue, fear/stress, diminished trust/cooperation, etc.), **not** the general home for all healthy creatures. Care Room graphic display is limited to four creatures.
- While in the Care Room, the player can inspect relevant condition and cooperation status.
- Recovery depends on the condition: fatigue can improve with sleep/rest; injury may require player-selected treatment; trust, fear, stress or behavioral difficulties can be addressed through suitable care/training interactions.
- **Choices in injury treatment or training questions affect how successful recovery is and may speed up or prolong its duration.** Relevant hunter skills (e.g. Crafting, Creature Handling) can influence options and outcomes.
- Trained creatures use **situational cooperation**: generally follow learned commands, but fear, injury, exhaustion, trust, species instincts, and personality can affect their response. Training is lasting proficiency; temporary low cooperation is not the same as forgetting training. Avoid arbitrary, frequent refusals.
- Keep this a **simple, player-controlled care process**, not a mandatory, elaborate rehabilitation minigame for every condition.

## POSSIBILITIES / OPEN FOR BALANCING — NOT LOCKED
- Example treatment durations of 10 minutes, 5 minutes, or instant depending on crafting skill; these are illustrations, not universal timers.
- Example 5-minute sleep/rest benefits for stress or fear; exact durations and effect sizes undecided.
- Exact treatment question sets, choice grading, success calculations, healing vs treatment time, skill thresholds, supplies, injury severities, and whether every condition requires intervention.
- Whether training healthy creatures happens elsewhere in the sanctuary; do not assume the Care Room is the universal training facility.
- How the collection's nondisplayed creatures are physically housed, habitat construction/expansion rules, habitat capacity, and creature assignments beyond graphical display.
- Whether injured creatures may join expeditions after manual removal, and what penalties or restrictions apply.

## IMPLEMENTATION STATUS
- Design documentation only. No claim of working UI, timers, treatment/training logic, or tests.
