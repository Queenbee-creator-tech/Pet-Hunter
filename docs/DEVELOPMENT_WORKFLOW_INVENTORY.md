# Pet Hunter — Development Workflow Inventory

Status definitions: Design → Metadata → Implementation → Testing → Complete. A decision or metadata entry is not a functioning feature. Update this inventory as each system advances.

| Workflow | Design | Metadata | Implementation | Testing | Current blocker |
| --- | --- | --- | --- | --- | --- |
| World development and generation | In progress | Draft | Not verified / generator not built | Not started | Grid size, cell scale, biome layout, elevation, hydrology, connected terrain, generation constraints |
| Developer-only world inspector | Concept proposed | Not started | Not started | Not started | Agree required layers and generator output schema |
| Exploration, travel, environmental interactions | In progress | Partial | Not verified | Not verified | Route/action rules and world grid |
| Creature species, habitats, genetics, mutations | In progress | Partial | Not verified | Not verified | Complete Autumn starter catalog and test |
| Combat | In progress | Partial | Not verified | Not verified | Engine implementation and integration tests |
| Capture | In progress | Partial | Not verified | Not verified | Engine implementation and integration tests |
| Hatchery and breeding | In progress | Partial | Not verified | Not verified | Engine implementation and integration tests |
| Care and training | In progress | Partial | Not verified | Not verified | Engine implementation and timer tests |
| Mobile-first UI and navigation | In progress | Partial | In progress, some fixes confirmed | Partial manual checks | End-to-end integration and mobile regression |
| Player progression, crafting, equipment | In progress | Partial | Not verified | Not verified | Skill gates, recipes, balancing |
| Persistence and full-game integration | In progress | Partial | Not verified | Not verified | Canonical world storage and end-to-end verification |

## Current focus: World development

### Approved
- One shared canonical geography generated once and saved, reused for all players.
- Four permanently seasonal biomes with Autumn central.
- Rule-guided placement with designer-controlled landmarks.
- Clumped/connected terrain; Autumn mainly meadows and rolling hills with smaller groves.
- Spring headwaters feed Autumn's lake and river continues to Summer ocean.
- Environmental hazards can temporarily obstruct routes without changing fixed geography.
- Hidden biome-specific discoveries at stable locations.
- Engine authoritative for location, routes, action availability and outcome.

### Required before generation
- [ ] Choose global grid dimensions (128² / 256² / 512² proposed; none approved).
- [ ] Define cell scale and relationship to narrative exploration movement.
- [ ] Choose coordinate axes, elevation units and neighbor connectivity.
- [ ] Define biome footprint constraints and boundary transitions.
- [ ] Define terrain clustering, adjacency and landform constraints.
- [ ] Define elevation generation, drainage, river routing, lakes, outlets and waterfalls.
- [ ] Define fixed landmarks, towns, safe arrival points, roads and physical routes.
- [ ] Define habitat/resource/hidden discovery placement rules.
- [ ] Define environmental hazard zone placement.
- [ ] Define seed/version policy, generation validation, and immutable persisted map schema.
- [ ] Build and run generator, save one canonical world.
- [ ] Build developer-only world inspector from actual saved grid with terrain/elevation/water/biome/routes layers and validation warnings.
- [ ] Test continuity, reachability, drainage and repeatable loading.

Do not mark generation complete until a saved grid is produced and verified.