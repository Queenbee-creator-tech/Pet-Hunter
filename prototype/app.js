import {BIOMES,fresh,leave,enter,decide,recover,RECOVERY_MS,STAMINA_MAX} from './engine.js';
// Versioned browser save: survives reloads on this browser, not other devices.
import {craftTestKit,useTestKit} from './loop.js';
import {normalizeIncubation,addEgg,startIncubation,hatch,odds,INCUBATION_MS} from './incubation.js';
const SAVE_KEY='pet-hunter-alpha-v03';
const BUILD='0.7.0';
function validSave(v){
 return v && typeof v==='object' && typeof v.screen==='string' &&
 typeof v.name==='string' && typeof v.background==='string' &&
 (v.homeBiome===null||BIOMES.includes(v.homeBiome)) &&
 (v.biome===null||BIOMES.includes(v.biome)) &&
 typeof v.stamina==='number' && Number.isFinite(v.stamina) &&
 (v.recoverySince==null || Number.isFinite(v.recoverySince)) &&
 v.inventory && ['eggs','materials','creatures'].every(k=>Number.isSafeInteger(v.inventory[k])&&v.inventory[k]>=0) &&
 Number.isSafeInteger(v.incubating)&&v.incubating>=0 &&
 Number.isSafeInteger(v.skills)&&v.skills>=0 &&
 Number.isSafeInteger(v.encounter)&&v.encounter>=0 &&
 (v.testKits===undefined||(Number.isSafeInteger(v.testKits)&&v.testKits>=0)) &&
 (v.testHatched===undefined||(Number.isSafeInteger(v.testHatched)&&v.testHatched>=0)) &&
 Array.isArray(v.log) && v.log.every(x=>typeof x==='string') &&
 typeof v.step==='string' && typeof v.lastOutcome==='string' &&
 ['intro','identity','background','homeChoice','sanctuary','character','skills','codex','incubation','care','craft','inventory','destinations','explore'].includes(v.screen) &&
 (!v.homeBiome || (v.name.trim() && v.background));
}
function loadSave(){
 try{const raw=localStorage.getItem(SAVE_KEY);if(!raw)return fresh();const data=JSON.parse(raw);if(validSave(data)){const legacy=data.stamina<=20 && !('autumnSkills' in data);return {...data,homeBiome:data.homeBiome?'Autumn':null,screen:data.screen==='homeChoice'?'sanctuary':data.screen,stamina:legacy?Math.min(STAMINA_MAX,data.stamina*25):data.stamina,autumnSkills:data.autumnSkills||{origin:'Autumn',status:'Starting skill set — details pending'},life:data.life??null,testKits:data.testKits??0,testHatched:data.testHatched??0};}console.warn('Pet Hunter: save failed validation',data);return fresh();}
 catch(err){console.warn('Pet Hunter: save load error',err);return fresh();}
}
let s=normalizeIncubation(loadSave());
if(!('recoverySince' in s))s={...s,recoverySince:null};
if(s.homeBiome && s.screen!=='explore' && s.stamina<STAMINA_MAX && s.recoverySince==null)s={...s,recoverySince:Date.now()};
s=recover(s);
let saveWarning='';
let saveStatus='Not saved yet';
try { if (localStorage.getItem(SAVE_KEY) && validSave(JSON.parse(localStorage.getItem(SAVE_KEY)))) saveStatus='Saved progress restored'; } catch {}
function save(){
 try{localStorage.setItem(SAVE_KEY,JSON.stringify(s));const check=localStorage.getItem(SAVE_KEY);if(!check||!validSave(JSON.parse(check)))throw new Error('Save verification failed');saveWarning='';saveStatus='Saved in this browser';}
 catch(err){console.warn('Pet Hunter save error',err);saveStatus='SAVE FAILED';saveWarning='Progress could not be saved in this browser. Avoid closing this tab.';}
}

const game=document.querySelector('#game'),stats=document.querySelector('#stats'),leaveButton=document.querySelector('#leave');
function p(t){const e=document.createElement('p');e.textContent=t;game.append(e);}
function heading(t){const e=document.createElement('h2');e.textContent=t;game.append(e);}
function button(label,fn,disabled=false){const e=document.createElement('button');e.className='choice';e.textContent=label;e.disabled=disabled;e.addEventListener('click',()=>{fn();save();render();});game.append(e);}
function setScreen(screen){s={...s,screen};}
function render(){
 const before=s.stamina;s=recover(s);if(s.stamina!==before)save();
 game.replaceChildren();
 const status=document.createElement('p');status.className='note';status.textContent='Alpha '+BUILD+' • '+saveStatus;game.append(status);
 if(saveWarning)p(saveWarning);
 stats.textContent=s.homeBiome?'Hunter: '+s.name+' • Home: '+s.homeBiome+' • Essence: '+s.stamina+'/'+STAMINA_MAX+' • Eggs: '+s.inventory.eggs+' • Materials: '+s.inventory.materials+' • Creatures: '+s.inventory.creatures+' • Practice: '+s.skills:'First-time character setup';
 leaveButton.hidden=s.screen!=='explore';
 if(s.screen==='intro'){heading('A Hunter’s Beginning');p('Every hunter has a story. Beyond the four seasonal domains, wild creatures and forgotten nests await. But first: who are you?');button('Begin your story',()=>setScreen('identity'));return;}
 if(s.screen==='identity'){heading('What is your name, Hunter?');p('Your name will follow you into every domain.');const input=document.createElement('input');input.placeholder='Hunter name';input.maxLength=32;input.value=s.name;input.setAttribute('aria-label','Hunter name');game.append(input);button('Continue',()=>{const name=input.value.trim();if(!name){alert('Enter your hunter name first.');return;}s={...s,name,screen:'background'};});return;}
 if(s.screen==='background'){heading('Your Past');p('Some hunters inherit generations of knowledge. Others step into the unknown without a family legacy.');button('Legacy Hunter — hunting runs in your family',()=>{s={...s,background:'Legacy Hunter',screen:'sanctuary',homeBiome:'Autumn'};});button('Aspiring Hunter — your story begins here',()=>{s={...s,background:'Aspiring Hunter',screen:'sanctuary',homeBiome:'Autumn'};});return;}
 if(s.screen==='sanctuary'){heading(s.homeBiome+' — Your Sanctuary');p('Welcome home, '+s.name+'. Your '+s.homeBiome+' sanctuary is where you keep your eggs, creatures, supplies and habitats.');p('Eggs in storage: '+s.inventory.eggs+' • Eggs incubating: '+s.incubating+' • Creatures in your care: '+s.inventory.creatures);p('Essence recovery: +2 every 5 minutes while home (up to 500).');button('Travel Journal',()=>setScreen('character'));button('Bag',()=>setScreen('inventory'));button('Visit the incubation room',()=>setScreen('incubation'));button('Visit the creature care area',()=>setScreen('care'));button('Visit the crafting workbench',()=>setScreen('craft'));button('Leave home to explore',()=>setScreen('destinations'));return;}
 if(s.screen==='character'){heading('Travel Journal — Character');p('Hunter: '+s.name+' • '+s.background+' • Origin: Autumn');p('Essence: '+s.stamina+'/'+STAMINA_MAX);p('Life: bar and values awaiting design');p('Autumn starting skills: granted; individual bonuses awaiting design.');p('Skill practice earned: '+s.skills);button('Flip page → Creature Codex',()=>setScreen('codex'));button('Return to sanctuary',()=>setScreen('sanctuary'));return;}
 if(s.screen==='codex'){heading('Travel Journal — Creature Codex');p('Creatures encountered and what you have learned about them will appear here. Encounter records are not implemented yet.');button('← Flip page to Character',()=>setScreen('character'));button('Return to sanctuary',()=>setScreen('sanctuary'));return;}
 if(s.screen==='skills'){setScreen('character');return;}
 if(['incubation','care','craft','inventory'].includes(s.screen)){
  const titles={incubation:'Incubation Room',care:'Creature Care Area',craft:'Crafting Workbench',inventory:'Your Bag'};heading(s.homeBiome+' Sanctuary — '+titles[s.screen]);
  if(s.screen==='incubation'){
   p('Stored eggs: '+s.inventory.eggs+' • Incubating: '+s.incubating+' / 3');
   p('Incubation skill: Level '+(s.incubationSkill??0)+' (alpha placeholder; XP progression TBD). Rarity is visible here, species stays hidden.');
   s.incubatorSlots.forEach((active,i)=>{
    heading('Incubator '+(i+1));
    if(active){
     const remaining=Math.max(0,Math.ceil((active.startedAt+INCUBATION_MS-Date.now())/1000));
     p(active.egg.rarity+' egg • '+(remaining?'Ready in '+Math.floor(remaining/60)+':'+String(remaining%60).padStart(2,'0'):'Ready to hatch')+' • '+active.chance+'% chance');
     button('Hatch Egg',()=>{const result=hatch(s,i);s=result.state;if(result.result==='success')alert('Success! You hatched '+result.egg.species+' ('+result.egg.rarity+').');else if(result.result==='failure')alert('The egg did not hatch and is permanently lost.');},remaining>0);
    }else{
     p('Empty');
     if(s.eggItems.length){
      const picker=document.createElement('select');
      picker.setAttribute('aria-label','Select egg for incubator '+(i+1));
      s.eggItems.forEach((egg,j)=>{
       const option=document.createElement('option');
       option.value=egg.id;
       option.textContent='Egg '+(j+1)+' — '+egg.rarity+' • '+odds(s.incubationSkill??0,egg.rarity)+'% success';
       picker.append(option);
      });
      game.append(picker);
      button('Select Egg for Incubator '+(i+1),()=>{
       const egg=s.eggItems.find(item=>item.id===picker.value);
       if(!egg)return;
       const chance=odds(s.incubationSkill??0,egg.rarity);
       if(confirm('Incubate this '+egg.rarity+' egg in incubator '+(i+1)+'? '+chance+'% hatch chance. Failure permanently loses the egg. Cancel keeps it safely in your bag.'))s=startIncubation(s,egg.id,i);
      });
     }else p('No eggs in storage. Explore to find one.');
    }
   });
   p('Temporary alpha: egg species and skill requirements are placeholders. Hatch results are decided by the engine.');
  }
  if(s.screen==='care'){p('Creatures in your care: '+s.inventory.creatures);p(s.inventory.creatures?'Your captured creatures are safe here. Feeding, taming and training are future test features.':'You have no captured creatures yet. Explore to find one.');}
  if(s.screen==='craft'){p('Crafting materials: '+s.inventory.materials+' • Test field kits: '+(s.testKits||0));button('Craft test field kit (1 material)',()=>s=craftTestKit(s),s.inventory.materials<1);p('Temporary alpha recipe. Crafting skill gates and actual recipes are not implemented yet.');}
  if(s.screen==='inventory'){p('Eggs: '+s.inventory.eggs+' • Incubating: '+s.incubating+' • Creatures: '+s.inventory.creatures+' • Materials: '+s.inventory.materials);p('Egg rarity can be inspected in the incubation room; species remains hidden until hatching.');p('Test field kits: '+(s.testKits||0)+' • Test-hatched creatures: '+(s.testHatched||0));p('Potions: not implemented • Carried pet classes: awaiting rules.');}
  button('Return to my sanctuary',()=>setScreen('sanctuary'));return;
 }
 if(s.screen==='destinations'){heading('Begin an Expedition');p('For this alpha, explore within Autumn. Other realms require travel unlocks.');button('Explore Autumn',()=>s=enter(s,'Autumn'));button('Stay at my sanctuary',()=>setScreen('sanctuary'));return;}
 heading(s.biome+' — Expedition');
 if(s.step==='trail'){if((s.testKits||0)>0)button('Use a test field kit (no bonus yet)',()=>s=useTestKit(s));p('You travel along a winding path. Strange marks interrupt the familiar terrain. What do you do?');button('Study the tracks',()=>s=decide(s,'observe'));button('Take the rocky shortcut',()=>s=decide(s,'shortcut'));}
 if(s.step==='clue'){p('The tracks lead toward a sheltered clearing. You hear movement ahead.');button('Follow the trail',()=>s=decide(s,'follow'));button('Avoid the clearing and keep moving',()=>s=decide(s,'avoid'));}
 if(s.step==='find'){p('TEST SCENE: In this clearing you can try one of three rewards. Actual encounters will not always show all three.');button('Collect materials (5 Essence)',()=>s=decide(s,'collect'),s.stamina<5);button('Collect an egg (5 Essence)',()=>{const before=s.inventory.eggs;s=decide(s,'egg');if(s.inventory.eggs>before){s={...s,inventory:{...s.inventory,eggs:before}};s=addEgg(s);}},s.stamina<5);button('Attempt creature capture (5 Essence)',()=>s=decide(s,'capture'),s.stamina<5);button('Leave the clearing without taking anything',()=>s=decide(s,'continue'));}
 if(s.step==='after'){if(s.lastOutcome)p(s.lastOutcome);p('The clearing grows quiet. You can keep exploring or return to your '+s.homeBiome+' sanctuary using Leave Exploration.');button('Continue exploring',()=>s=decide(s,'continue'));}
 p('Recent expedition events:');s.log.slice(-3).forEach(p);
}
leaveButton.addEventListener('click',()=>{if((s.step==='find'||s.step==='clue')&&!confirm('Leave exploration? Your unfinished encounter ends; collected rewards and skills stay with you.'))return;s=leave(s);save();render();});
document.querySelector('#reset').addEventListener('click',()=>{if(confirm('Reset all alpha test progress, including your character?')){s=normalizeIncubation(fresh());try{localStorage.removeItem(SAVE_KEY);saveWarning='';saveStatus='Reset complete — not saved yet';}catch{saveWarning='Unable to clear browser save.';}render();}});
render();

// Refresh the on-screen stamina while the sanctuary is open; recovery also catches up after reload.
setInterval(()=>{if(s.screen==='incubation'||(s.homeBiome && s.screen!=='explore' && s.stamina<STAMINA_MAX))render();},15000);
