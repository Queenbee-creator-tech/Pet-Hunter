# Pet Hunter — Exploration UI (approved direction)

Status: design direction approved 2026-10-24; not yet implemented.

## Core presentation
Exploration remains **text-based**. The screen uses a full-bleed illustrated environment background for the currently explored domain/biome, with an accessible translucent narrative and choices layer in the foreground. Background is atmosphere and context, not a replacement for text descriptions or the gameplay engine.

## Biome backgrounds
- Autumn uses its established autumn biome aesthetic: open meadows and hills with scattered smaller groves, rich seasonal foliage.
- Each other biome/domain uses its own distinctive environment background when unlocked and implemented. Do not invent or lock the other biomes' visual specifics here.
- Keep the same layout and interaction model across biomes; only scene artwork and appropriate visual accents change.
- Future location-specific variants may be used within a biome (e.g. grove versus meadow) when supported by the world/location state; no random scene changes that contradict the game state.
- Use an unobtrusive gradient overlay behind text for readability and provide fallback background if an image fails to load.

## Persistent controls
- Backpack/Bag and Travel Journal remain in a consistent corner of the screen across exploration and sanctuary, available without losing the current state.
- Compact HUD displays existing player resources; avoid obscuring gameplay choices on small screens.
- The narrative panel shows location/scene description, encounters, hazards, outcomes, and selectable actions from the existing game engine.
- Existing skill-gated action visibility must follow the approved hybrid rule; UI must not independently calculate or invent skill outcomes.

## Accessibility / responsive behavior
- Text and choices stay readable over any image. Responsive panel positioning, scrollable narrative content, and comfortably sized touch targets.
- Keyboard accessible actions and focus states. Respect reduced-motion settings for scene transitions.
- Preserve progress and state when switching Journal/Bag or returning to sanctuary.

## Implementation checklist
- [x] Approve text-over-biome-background design
- [x] Approve persistent Journal and Bag corner icons
- [ ] Inventory existing exploration render and action handlers
- [ ] Build reusable background scene layer keyed by existing biome/location state
- [ ] Build translucent narrative and action panel
- [ ] Integrate shared persistent HUD / Journal / Bag controls
- [ ] Wire existing expedition and skill-gated choices without modifying rules
- [ ] Add Autumn background asset and safe fallback
- [ ] Add other biome backgrounds only when those biomes are defined/unlocked
- [ ] Test mobile, desktop, keyboard, reduced motion, and save-state continuity

Reference: docs/AUTUMN_SANCTUARY_UI.md for shared sanctuary/exploration UI shell.
