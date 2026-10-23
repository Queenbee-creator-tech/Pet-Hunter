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
