# Pet Hunter — Autumn Sanctuary UI Design (v1)

Status: visual direction approved; implementation pending. Reference: cozy illustrated cottage concept discussed 2026-10-24.

## Goal
Replace the text-button sanctuary dashboard with an immersive, mobile-first, illustrated **interior** of an autumn cottage. Keep Pet Hunter a text-based game: visual scenes provide navigation and atmosphere, while text panels provide narrative, decisions and game feedback. Do not change existing mechanics, state schema or save data just to redesign the interface.

## Approved art direction
- Cozy storybook fantasy mixed with stylized fantasy RPG, not photorealistic or childish.
- Warm amber fireplace, exposed timber beams, wooden furniture, bookshelves, crafting bench, rugs, autumn foliage through windows, welcoming front door.
- The home should feel lived in, with subtle ambient motion where practical.
- The generated illustration is a *concept reference*, not a pixel-perfect production asset or functional interface.

## Persistent HUD
- Compact resource display: Hunter, Home, Essence current/max, Eggs, Materials, Creatures, Practice.
- Journal and Bag anchored to a corner in sanctuary **and exploration**; do not duplicate these as giant center-screen buttons.
- Make resources readable and accommodate narrow screens without obscuring core navigation.

## Sanctuary interactions
- Main view shows inside the cottage, not an outside village or grid of action cards.
- Library: subtle visible interactive dot on bookshelf. Click/tap zooms or transitions into a library-focused panel.
- Crafting Workbench: subtle dot on workbench. Click/tap zooms or transitions into existing crafting actions.
- Door: visible hotspot labeled Leave to Explore; enters existing expedition flow.
- Each hotspot also needs accessible text labeling, keyboard focus, touch target and reduced-motion fallback.

## Bottom navigation
Persistent sanctuary-room tabs: Sanctuary, Incubation Room, Breeding Room, Creature Care. Switching rooms should display a room-specific scene and existing actions, not reload/reset player state. Journal/Bag remain accessible across sanctuary and exploration.

## Implementation strategy
1. Inspect existing prototype/app.js and prototype/style.css and inventory all action handlers and state transitions.
2. Build presentation shell (HUD, scene, hotspots, bottom navigation, narrative/action panel) around existing game functions; avoid copying game logic into UI.
3. Use a properly licensed/owned cottage background asset; generated concept art is a visual guide until an actual usable asset is added.
4. Responsive layout for desktop and mobile; support landscape and portrait where practical. Accessible focus/labels, contrast and reduced-motion mode.
5. Regression-test existing actions, saves, resource counts, incubation, breeding, creature care, crafting, exploration and Reset Test.

## UI delivery checklist
- [x] Approve cottage interior viewpoint and A+C style
- [x] Approve persistent Journal/Bag corner icons
- [x] Approve bottom room tabs and Library/Workbench dots
- [ ] Prepare usable production background art asset
- [ ] Implement responsive HUD and sanctuary shell
- [ ] Connect existing game actions
- [ ] Add room-specific scenes and text panels
- [ ] Test mobile, keyboard and reduced motion
- [ ] Verify existing saves and regression tests

Do not treat unimplemented UI ideas as finished features. Gameplay rules remain governed by their existing design documents.

## Mobile-first layout clarification (2026-10-24)
Mobile is the primary target; desktop is an adaptive wider layout, not the baseline shrunk down. Portrait phone view should show a purpose-composed cottage scene with the fireplace, bookshelf, workbench and door discoverable; do not just crop the widescreen concept art indiscriminately. Use a compact top HUD (allow resource details to expand), persistent Journal and Bag in a reachable corner, and a fixed bottom room tab bar with four clearly tappable destinations. Hotspots need approximately 44px or larger touch targets, visible labels/focus feedback and a text-accessible alternative. Ensure safe-area insets, small-screen scrolling where necessary, and that overlays do not block essential actions. On desktop, expand the scene and HUD while preserving the same interaction model. Build/test portrait at narrow phone widths first, then landscape and desktop. The reference widescreen cottage illustration is a mood/layout concept, not a ready-to-crop mobile asset.
