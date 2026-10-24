import test from 'node:test';
import assert from 'node:assert/strict';
import {fresh,enter,leave,decide} from '../prototype/engine.js';
import {craftTestKit,placeTestEgg,hatchTestEgg,useTestKit} from '../prototype/loop.js';
const home=()=>({...fresh(),name:'Alpha',background:'Aspiring Hunter',homeBiome:'Autumn',screen:'sanctuary'});
const find=s=>decide(decide(s,'observe'),'follow');
test('full loop: explore, collect, return, craft, incubate, hatch, explore again',()=>{
 let s=enter(home(),'Autumn');
 s=decide(find(s),'collect');
 s=decide(find(decide(s,'continue')),'egg');
 assert.equal(s.inventory.materials,1);assert.equal(s.inventory.eggs,1);
 s=leave(s,1000);
 s={...s,screen:'craft'};s=craftTestKit(s);
 assert.equal(s.inventory.materials,0);assert.equal(s.testKits,1);
 s={...s,screen:'incubation'};s=placeTestEgg(s);
 assert.equal(s.inventory.eggs,0);assert.equal(s.incubating,1);
 s=hatchTestEgg(s);
 assert.equal(s.incubating,0);assert.equal(s.inventory.creatures,1);
 s=JSON.parse(JSON.stringify(s));
 s=enter(s,'Autumn',1001);
 s=useTestKit(s);
 assert.equal(s.testKits,0);assert.equal(s.inventory.creatures,1);
});
test('no free crafting or hatching; correct screen required',()=>{
 let s=home();assert.equal(craftTestKit(s),s);assert.equal(placeTestEgg(s),s);
 s={...s,screen:'craft'};assert.equal(craftTestKit(s),s);
 s={...s,screen:'incubation'};assert.equal(hatchTestEgg(s),s);
 s={...s,screen:'explore'};assert.equal(useTestKit(s),s);
});
test('hatching consumes one incubating egg, not a stored egg',()=>{
 let s={...home(),screen:'incubation',incubating:2,inventory:{eggs:3,materials:0,creatures:0}};
 s=hatchTestEgg(s);assert.equal(s.incubating,1);assert.equal(s.inventory.eggs,3);assert.equal(s.inventory.creatures,1);
});
