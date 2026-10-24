import test from 'node:test';
import assert from 'node:assert/strict';
import {fresh} from '../prototype/engine.js';
import {normalizeBreeding,addCreature,eligibleCreatures,beginBreeding,finishBreeding,BREEDING_MS,BREEDING_COOLDOWN_MS} from '../prototype/breeding.js';
function setup(){let s={...fresh(),screen:'breeding',homeBiome:'Autumn'};for(let i=0;i<4;i++)s=addCreature(s,'Approved creature','Rare');return s;}
test('simultaneous independent pairs and no reuse of occupied creature',()=>{
 let s=setup();const ids=s.creatureItems.map(c=>c.id);
 s=beginBreeding(s,ids[0],ids[1],1000);s=beginBreeding(s,ids[2],ids[3],1000);
 assert.equal(s.breedingPairs.length,2);
 assert.equal(beginBreeding(s,ids[0],ids[2],1000).breedingPairs.length,2);
});
test('two-minute timer, successful egg, five-minute cooldown per creature',()=>{
 let s=setup();const ids=s.creatureItems.map(c=>c.id);
 s=beginBreeding(s,ids[0],ids[1],1000);
 assert.equal(finishBreeding(s,s.breedingPairs[0].id,1000+BREEDING_MS-1,0).result,null);
 const result=finishBreeding(s,s.breedingPairs[0].id,1000+BREEDING_MS,0);
 assert.equal(result.result,'success');assert.equal(result.state.inventory.eggs,1);
 assert.equal(result.state.creatureItems[0].cooldownUntil,1000+BREEDING_MS+BREEDING_COOLDOWN_MS);
 assert.equal(eligibleCreatures(result.state,1000+BREEDING_MS).length,2);
 assert.equal(eligibleCreatures(result.state,1000+BREEDING_MS+BREEDING_COOLDOWN_MS).length,4);
 assert.equal(finishBreeding(result.state,s.breedingPairs[0].id,1000+BREEDING_MS,0).result,null);
});
test('failure also causes recovery, without egg',()=>{
 let s=setup();const ids=s.creatureItems.map(c=>c.id);
 s=beginBreeding(s,ids[0],ids[1],1000);
 const result=finishBreeding(s,s.breedingPairs[0].id,1000+BREEDING_MS,0.99);
 assert.equal(result.result,'failure');assert.equal(result.state.inventory.eggs,0);
 assert.equal(eligibleCreatures(result.state,1000+BREEDING_MS).length,2);
});
test('offline time survives JSON save and species cannot be invented',()=>{
 let s=setup();const ids=s.creatureItems.map(c=>c.id);
 s=beginBreeding(s,ids[0],ids[1],1000);s=JSON.parse(JSON.stringify(s));
 const result=finishBreeding(s,s.breedingPairs[0].id,1000+BREEDING_MS,0,()=>({species:'Unapproved hybrid',rarity:'Legendary',traits:['test']}));
 assert.equal(result.egg.species,'Approved creature');assert.equal(result.egg.rarity,'Rare');
});
