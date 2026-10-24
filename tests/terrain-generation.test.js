import test from 'node:test';
import assert from 'node:assert/strict';
import {WORLD_CONFIG, seededRandom, smoothField, terrainMask, countConnectedComponents} from '../world/generation/terrain.js';

test('approved Avalora grid metadata is consistent', () => {
  assert.equal(WORLD_CONFIG.width * WORLD_CONFIG.cellMeters / 1000, 25.6);
  assert.equal(Object.values(WORLD_CONFIG.biomeTargets).reduce((a,b)=>a+b,0), 100);
  assert.equal(WORLD_CONFIG.oceanInsideGrid, true);
});
test('seeded terrain is reproducible and varies with seed', () => {
  assert.deepEqual(smoothField(32, 32, 12), smoothField(32, 32, 12));
  assert.notDeepEqual(smoothField(32, 32, 12), smoothField(32, 32, 13));
  assert.equal(seededRandom(7)(), seededRandom(7)());
});
test('mask coverage matches requested cell count', () => {
  const mask = terrainMask(32, 32, 42, 0.25);
  assert.equal(mask.reduce((a,b)=>a+b,0), 256);
  assert.equal(terrainMask(8,8,1,0).reduce((a,b)=>a+b,0),0);
  assert.equal(terrainMask(8,8,1,1).reduce((a,b)=>a+b,0),64);
});
test('terrain mask creates fewer patches than unsmoothed random noise for a stable example', () => {
  const clustered = terrainMask(64,64,22,0.25,5);
  const random = terrainMask(64,64,22,0.25,0);
  assert.ok(countConnectedComponents(clustered,64,64) < countConnectedComponents(random,64,64));
});
test('invalid terrain inputs fail explicitly', () => {
  assert.throws(()=>terrainMask(4,4,1,1.2),RangeError);
  assert.throws(()=>smoothField(0,4,1),RangeError);
});
