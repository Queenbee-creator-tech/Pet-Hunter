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

test('Summer coastal city and turtle transport destinations are represented',()=>{
 const w=generateWorldDraft(42);
 assert.equal(w.biomes[w.landmarks.summerCity.y*w.width+w.landmarks.summerCity.x],2);
 assert.ok(w.landmarks.summerIslands.length>=2);
 assert.ok(w.landmarks.underwaterDestinations.length>=1);
 assert.equal(w.turtleRoutes.length,w.landmarks.summerIslands.length+w.landmarks.underwaterDestinations.length);
 assert.ok(w.turtleRoutes.every(route=>route.transport==='giant_turtle'));
});

test('Geography preview preserves varied mountain elevations and central Autumn lake',()=>{
 const w=generateWorldDraft(42), {width,height,landmarks,terrain,elevation}=w;
 assert.ok(landmarks.autumnLake.y>height*.25&&landmarks.autumnLake.y<height*.7,'lake should not be on northern edge');
 const winterElevations=[];
 for(let i=0;i<w.biomes.length;i++)if(w.biomes[i]===3)winterElevations.push(elevation[i]);
 assert.ok(Math.max(...winterElevations)-Math.min(...winterElevations)>400,'winter needs varied mountain heights');
 const groves=terrain.reduce((n,t)=>n+(t===TERRAIN.GROVE),0);
 assert.ok(groves>0,'Autumn needs groves');
});

test('Spring floating islands have separate heights and substantial footprints',()=>{
 const w=generateWorldDraft(42), islands=w.landmarks.floatingIslands;
 assert.ok(islands.length>=3);
 assert.ok(new Set(islands.map(p=>p.height)).size>=3);
 const city=w.landmarks.springCity;
 assert.ok(w.floatingHeight[city.y*w.width+city.x]>0);
 const floatingCells=w.floatingHeight.reduce((n,v)=>n+(v>0),0);
 assert.ok(floatingCells>150,'floating land should be visible on inspector');
});
