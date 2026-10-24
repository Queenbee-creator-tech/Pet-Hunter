// Incubation engine: configurable alpha rarity thresholds and odds, not final XP balance.
export const INCUBATION_MS=120000;
export const INCUBATOR_SLOTS=3;
export const TARGET_LEVELS={Common:0,Uncommon:3,Rare:5,Legendary:7};
export const RARITIES=Object.keys(TARGET_LEVELS);
export function odds(level,rarity,targets=TARGET_LEVELS){
 const target=targets[rarity];
 if(!Number.isSafeInteger(level)||level<0||!Number.isSafeInteger(target))throw Error('Invalid incubation skill or rarity');
 return level>target?100:level===target?97:Math.max(5,97-(target-level)*10); // 10-point penalty is provisional.
}
export function normalizeIncubation(s){
 const slots=Array.isArray(s.incubatorSlots)?s.incubatorSlots.slice(0,INCUBATOR_SLOTS):[];
 while(slots.length<INCUBATOR_SLOTS)slots.push(null);
 const eggs=Array.isArray(s.eggItems)?s.eggItems.map(e=>({...e})):[];
 const legacy=s.inventory.eggs-eggs.length;
 for(let i=0;i<Math.max(0,legacy);i++)eggs.push({id:'legacy-'+i,rarity:'Common',species:'Unknown creature'});
 let n=Number.isSafeInteger(s.nextEggId)?s.nextEggId:0;
 // Old incubating count migrated into ready-to-hatch slots, preserving earned eggs.
 if(!Array.isArray(s.incubatorSlots))for(let i=0;i<Math.min(INCUBATOR_SLOTS,s.incubating||0);i++)slots[i]={egg:{id:'legacy-inc-'+i,rarity:'Common',species:'Unknown creature'},startedAt:0,chance:100};
 return {...s,eggItems:eggs,incubatorSlots:slots,nextEggId:n,incubating:slots.filter(Boolean).length,inventory:{...s.inventory,eggs:eggs.length}};
}
export function addEgg(s,rarity='Common',species='Unknown creature'){
 if(!RARITIES.includes(rarity))throw Error('Unknown rarity');
 s=normalizeIncubation(s);const id='egg-'+s.nextEggId;
 return {...s,nextEggId:s.nextEggId+1,eggItems:[...s.eggItems,{id,rarity,species}],inventory:{...s.inventory,eggs:s.inventory.eggs+1}};
}
export function startIncubation(s,eggId,slot,now=Date.now(),targets=TARGET_LEVELS){
 s=normalizeIncubation(s);
 if(s.screen!=='incubation'||!Number.isInteger(slot)||slot<0||slot>=INCUBATOR_SLOTS||s.incubatorSlots[slot]||!Number.isFinite(now))return s;
 const egg=s.eggItems.find(e=>e.id===eggId);if(!egg)return s;
 const chance=odds(s.incubationSkill??0,egg.rarity,targets);
 const slots=[...s.incubatorSlots];slots[slot]={egg,startedAt:now,chance};
 return {...s,incubatorSlots:slots,eggItems:s.eggItems.filter(e=>e.id!==eggId),incubating:s.incubating+1,inventory:{...s.inventory,eggs:s.inventory.eggs-1},log:[...s.log,'Started incubating an egg.']};
}
export function hatch(s,slot,now=Date.now(),roll=Math.random()){
 s=normalizeIncubation(s);
 const active=s.incubatorSlots[slot];
 if(s.screen!=='incubation'||!active||now-active.startedAt<INCUBATION_MS||!Number.isFinite(roll)||roll<0||roll>=1)return {state:s,result:null};
 const success=roll*100<active.chance;
 const slots=[...s.incubatorSlots];slots[slot]=null;
 const result=success?'success':'failure';
 return {state:{...s,incubatorSlots:slots,incubating:s.incubating-1,inventory:{...s.inventory,creatures:s.inventory.creatures+(success?1:0)},testHatched:(s.testHatched||0)+(success?1:0),log:[...s.log,success?'Egg hatched: '+active.egg.species+' ('+active.egg.rarity+').':'Incubation failed. The egg was permanently lost.']},result,egg:success?active.egg:null};
}
