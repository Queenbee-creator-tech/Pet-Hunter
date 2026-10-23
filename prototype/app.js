import {BIOMES,fresh,leave,enter,decide} from './engine.js';
let s=fresh();
const game=document.querySelector('#game'),stats=document.querySelector('#stats'),leaveButton=document.querySelector('#leave');
function p(t){const e=document.createElement('p');e.textContent=t;game.append(e);}
function heading(t){const e=document.createElement('h2');e.textContent=t;game.append(e);}
function button(label,fn,disabled=false){const e=document.createElement('button');e.className='choice';e.textContent=label;e.disabled=disabled;e.addEventListener('click',()=>{fn();render();});game.append(e);}
function setScreen(screen){s={...s,screen};}
function render(){
 game.replaceChildren();
 stats.textContent=s.homeBiome?'Hunter: '+s.name+' • Home: '+s.homeBiome+' • Stamina: '+s.stamina+'/20 • Eggs: '+s.inventory.eggs+' • Materials: '+s.inventory.materials+' • Creatures: '+s.inventory.creatures+' • Practice: '+s.skills:'First-time character setup';
 leaveButton.hidden=s.screen!=='explore';
 if(s.screen==='intro'){heading('A Hunter’s Beginning');p('Every hunter has a story. Beyond the four seasonal domains, wild creatures and forgotten nests await. But first: who are you?');button('Begin your story',()=>setScreen('identity'));return;}
 if(s.screen==='identity'){heading('What is your name, Hunter?');p('Your name will follow you into every domain.');const input=document.createElement('input');input.placeholder='Hunter name';input.maxLength=32;input.value=s.name;input.setAttribute('aria-label','Hunter name');game.append(input);button('Continue',()=>{const name=input.value.trim();if(!name){alert('Enter your hunter name first.');return;}s={...s,name,screen:'background'};});return;}
 if(s.screen==='background'){heading('Your Past');p('Some hunters inherit generations of knowledge. Others step into the unknown without a family legacy.');button('Legacy Hunter — hunting runs in your family',()=>{s={...s,background:'Legacy Hunter',screen:'homeChoice'};});button('Aspiring Hunter — your story begins here',()=>{s={...s,background:'Aspiring Hunter',screen:'homeChoice'};});return;}
 if(s.screen==='homeChoice'){heading('Where will you call home?');p('Your sanctuary will be a real place within the seasonal biome you choose. This is your home, even when you travel to other biomes.');BIOMES.forEach(b=>button(b+' — make this my home',()=>{s={...s,homeBiome:b,screen:'sanctuary',log:[...s.log,'Established a sanctuary in '+b+'.']};}));return;}
 if(s.screen==='sanctuary'){heading(s.homeBiome+' — Your Sanctuary');p('Welcome home, '+s.name+'. Your '+s.homeBiome+' sanctuary is where you keep your eggs, creatures, supplies and habitats.');p('Eggs in storage: '+s.inventory.eggs+' • Eggs incubating: '+s.incubating+' • Creatures in your care: '+s.inventory.creatures);button('Visit the incubation room',()=>setScreen('incubation'));button('Visit the creature care area',()=>setScreen('care'));button('Visit the crafting workbench',()=>setScreen('craft'));button('Check expedition supplies',()=>setScreen('inventory'));button('Leave home to explore',()=>setScreen('destinations'));return;}
 if(['incubation','care','craft','inventory'].includes(s.screen)){
  const titles={incubation:'Incubation Room',care:'Creature Care Area',craft:'Crafting Workbench',inventory:'Your Supplies'};heading(s.homeBiome+' Sanctuary — '+titles[s.screen]);
  if(s.screen==='incubation'){p('Stored eggs: '+s.inventory.eggs+' • In incubator: '+s.incubating);button('Place one egg in incubator (test)',()=>{s={...s,inventory:{...s.inventory,eggs:s.inventory.eggs-1},incubating:s.incubating+1};},s.inventory.eggs<1);p('Hatching timers and genetics are not built yet.');}
  if(s.screen==='care'){p('Creatures in your care: '+s.inventory.creatures);p(s.inventory.creatures?'Your captured creatures are safe here. Feeding, taming and training are future test features.':'You have no captured creatures yet. Explore to find one.');}
  if(s.screen==='craft'){p('Crafting materials: '+s.inventory.materials);p('Recipe and equipment systems are not implemented yet.');}
  if(s.screen==='inventory'){p('Eggs: '+s.inventory.eggs+' • Incubating: '+s.incubating+' • Creatures: '+s.inventory.creatures+' • Materials: '+s.inventory.materials);p('Practice progress: '+s.skills);}
  button('Return to my sanctuary',()=>setScreen('sanctuary'));return;
 }
 if(s.screen==='destinations'){heading('Begin an Expedition');p('Your home remains in '+s.homeBiome+'. Choose which seasonal biome to explore.');BIOMES.forEach(b=>button('Explore '+b,()=>s=enter(s,b)));button('Stay at my sanctuary',()=>setScreen('sanctuary'));return;}
 heading(s.biome+' — Expedition');
 if(s.step==='trail'){p('You travel along a winding path. Strange marks interrupt the familiar terrain. What do you do?');button('Study the tracks',()=>s=decide(s,'observe'));button('Take the rocky shortcut',()=>s=decide(s,'shortcut'));}
 if(s.step==='clue'){p('The tracks lead toward a sheltered clearing. You hear movement ahead.');button('Follow the trail',()=>s=decide(s,'follow'));button('Avoid the clearing and keep moving',()=>s=decide(s,'avoid'));}
 if(s.step==='find'){p('TEST SCENE: In this clearing you can try one of three rewards. Actual encounters will not always show all three.');button('Collect materials (5 stamina)',()=>s=decide(s,'collect'),s.stamina<5);button('Collect an egg (5 stamina)',()=>s=decide(s,'egg'),s.stamina<5);button('Attempt creature capture (5 stamina)',()=>s=decide(s,'capture'),s.stamina<5);button('Leave the clearing without taking anything',()=>s=decide(s,'continue'));}
 if(s.step==='after'){if(s.lastOutcome)p(s.lastOutcome);p('The clearing grows quiet. You can keep exploring or return to your '+s.homeBiome+' sanctuary using Leave Exploration.');button('Continue exploring',()=>s=decide(s,'continue'));}
 p('Recent expedition events:');s.log.slice(-3).forEach(p);
}
leaveButton.addEventListener('click',()=>{if((s.step==='find'||s.step==='clue')&&!confirm('Leave exploration? Your unfinished encounter ends; collected rewards and skills stay with you.'))return;s=leave(s);render();});
document.querySelector('#reset').addEventListener('click',()=>{if(confirm('Reset all alpha test progress, including character and home biome?')){s=fresh();render();}});
render();
