import test from 'node:test';
import assert from 'node:assert/strict';
import {fresh} from '../prototype/engine.js';
import {normalizeIncubation,addEgg,startIncubation,hatch,odds,INCUBATION_MS} from '../prototype/incubation.js';
const home=()=>({...fresh(),screen:'incubation',homeBiome:'Autumn',name:'Test',background:'Aspiring Hunter'});
test('rarity thresholds: below, at 97, above 100',()=>{
 assert.equal(odds(6,'Legendary'),87);assert.equal(odds(7,'Legendary'),97);assert.equal(odds(8,'Legendary'),100);
 assert.equal(odds(0,'Common'),97);assert.equal(odds(1,'Common'),100);
});
test('three independent slots and no fourth',()=>{
 let s=home();for(let i=0;i<4;i++)s=addEgg(s,'Rare');
 for(let i=0;i<3;i++)s=startIncubation(s,s.eggItems[0].id,i,1000);
 assert.equal(s.incubating,3);assert.equal(s.inventory.eggs,1);
 assert.equal(startIncubation(s,s.eggItems[0].id,0,1000),s);
});
test('early hatch blocked; failure destroys egg permanently',()=>{
 let s=addEgg(home(),'Legendary');s=startIncubation(s,s.eggItems[0].id,0,1000);
 assert.equal(hatch(s,0,1000+INCUBATION_MS-1,0).result,null);
 const result=hatch(s,0,1000+INCUBATION_MS,0.999);
 assert.equal(result.result,'failure');assert.equal(result.state.incubating,0);assert.equal(result.state.inventory.creatures,0);assert.equal(result.state.inventory.eggs,0);
});
test('successful hatch creates creature and is single-claim',()=>{
 let s=addEgg({...home(),incubationSkill:8},'Legendary','Test creature');s=startIncubation(s,s.eggItems[0].id,0,1000);
 const result=hatch(s,0,1000+INCUBATION_MS,0.999);
 assert.equal(result.result,'success');assert.equal(result.egg.species,'Test creature');
 assert.equal(result.state.inventory.creatures,1);
 assert.equal(hatch(result.state,0,1000+INCUBATION_MS,0).result,null);
});
test('cancel is non-destructive; reload retains timer and rarity',()=>{
 let s=addEgg(home(),'Uncommon');const id=s.eggItems[0].id;
 assert.equal(s.inventory.eggs,1);
 s=startIncubation(s,id,2,1000);s=normalizeIncubation(JSON.parse(JSON.stringify(s)));
 assert.equal(s.incubatorSlots[2].egg.rarity,'Uncommon');
 assert.equal(hatch(s,2,1000+INCUBATION_MS,0).result,'success');
});
test('legacy eggs are migrated to individually tracked eggs',()=>{
 const s=normalizeIncubation({...home(),inventory:{eggs:2,materials:0,creatures:0}});
 assert.equal(s.eggItems.length,2);assert.equal(s.incubatorSlots.length,3);
});
