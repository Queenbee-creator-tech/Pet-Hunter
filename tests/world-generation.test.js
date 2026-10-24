import test from 'node:test';
import assert from 'node:assert/strict';
import {generateWorldDraft,validateWorldDraft,TERRAIN} from '../world/generation/world.js';

for(const seed of [0,1,7,42,2026]){
 test('Avalora draft terrain seed '+seed,()=>{
  const world=generateWorldDraft(seed);
  assert.equal(world.width*world.height,65536);
  assert.equal(world.canonical,false);
  assert.deepEqual(validateWorldDraft(world),{ok:true,issues:[]});
  for(const t of [TERRAIN.MEADOW,TERRAIN.FOREST,TERRAIN.MOUNTAIN,TERRAIN.VALLEY,TERRAIN.LAKE,TERRAIN.RIVER,TERRAIN.OCEAN,TERRAIN.ISLAND])
   assert.ok(world.terrain.includes(t),'Missing terrain '+t);
  assert.deepEqual(generateWorldDraft(seed).terrain,world.terrain);
 });
}
test('Draft generation does not silently support tiny grids',()=>{
 assert.throws(()=>generateWorldDraft(1,8,8),RangeError);
});
