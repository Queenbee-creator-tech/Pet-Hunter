// Breeding alpha. Species, inheritance, mutation, and rarity probabilities remain configurable.
// Do not invent hybrid species: offspring use a registered parent species until a species catalog exists.
export const BREEDING_MS=2*60*1000;
export const BREEDING_COOLDOWN_MS=5*60*1000;
export const BREEDING_SUCCESS_CHANCE=0.8; // alpha placeholder, not final balance
export function normalizeBreeding(s){
 const creatures=Array.isArray(s.creatureItems)?s.creatureItems.map(c=>({...c})):[];
 const missing=Math.max(0,(s.inventory?.creatures||0)-creatures.length);
 let next=Number.isSafeInteger(s.nextCreatureId)?s.nextCreatureId:0;
 for(let i=0;i<missing;i++)creatures.push({id:'creature-'+next++,species:'Unknown creature',rarity:'Common',traits:[],cooldownUntil:0});
 const pairs=Array.isArray(s.breedingPairs)?s.breedingPairs.map(p=>({...p})):[];
 return {...s,creatureItems:creatures,nextCreatureId:next,breedingPairs:pairs,inventory:{...s.inventory,creatures:creatures.length}};
}
export function addCreature(s,species='Unknown creature',rarity='Common',traits=[]){
 s=normalizeBreeding(s);
 const creature={id:'creature-'+s.nextCreatureId,species,rarity,traits:[...traits],cooldownUntil:0};
 return {...s,nextCreatureId:s.nextCreatureId+1,creatureItems:[...s.creatureItems,creature],inventory:{...s.inventory,creatures:s.inventory.creatures+1}};
}
export function eligibleCreatures(s,now=Date.now()){
 s=normalizeBreeding(s);
 const occupied=new Set(s.breedingPairs.flatMap(p=>p.claimed?[]:[p.firstId,p.secondId]));
 return s.creatureItems.filter(c=>!occupied.has(c.id)&&(c.cooldownUntil||0)<=now);
}
export function beginBreeding(s,firstId,secondId,now=Date.now()){
 s=normalizeBreeding(s);
 if(s.screen!=='breeding'||firstId===secondId||!Number.isFinite(now))return s;
 const available=eligibleCreatures(s,now);
 if(!available.some(c=>c.id===firstId)||!available.some(c=>c.id===secondId))return s;
 const id='pair-'+(s.nextBreedingId||0);
 return {...s,nextBreedingId:(s.nextBreedingId||0)+1,breedingPairs:[...s.breedingPairs,{id,firstId,secondId,startedAt:now,claimed:false}],log:[...s.log,'Breeding attempt started.']};
}
export function finishBreeding(s,pairId,now=Date.now(),roll=Math.random(),inheritance=null){
 s=normalizeBreeding(s);
 const pair=s.breedingPairs.find(p=>p.id===pairId);
 if(s.screen!=='breeding'||!pair||pair.claimed||now<pair.startedAt+BREEDING_MS||!Number.isFinite(roll)||roll<0||roll>=1)return {state:s,result:null};
 const endedAt=pair.startedAt+BREEDING_MS;
 const parents=[s.creatureItems.find(c=>c.id===pair.firstId),s.creatureItems.find(c=>c.id===pair.secondId)];
 if(parents.some(c=>!c))return {state:s,result:null};
 const success=roll<BREEDING_SUCCESS_CHANCE;
 // Both parents recover individually, even when the attempt fails.
 const creatures=s.creatureItems.map(c=>[pair.firstId,pair.secondId].includes(c.id)?{...c,cooldownUntil:endedAt+BREEDING_COOLDOWN_MS}:c);
 let egg=null;
 if(success){
  const picked=inheritance?inheritance(parents):parents[0];
  // Enforce approved parent species only until a species/hybrid catalog is implemented.
  const species=parents.some(c=>c.species===picked?.species)?picked.species:parents[0].species;
  const rarity=parents.some(c=>c.rarity===picked?.rarity)?picked.rarity:parents[0].rarity;
  egg={id:'egg-'+(s.nextEggId||0),species,rarity,traits:Array.isArray(picked?.traits)?[...picked.traits]:[]};
 }
 const eggs=Array.isArray(s.eggItems)?s.eggItems:[];
 const next={...s,creatureItems:creatures,breedingPairs:s.breedingPairs.map(p=>p.id===pairId?{...p,claimed:true,success}:p),eggItems:success?[...eggs,egg]:eggs,nextEggId:(s.nextEggId||0)+(success?1:0),inventory:{...s.inventory,eggs:s.inventory.eggs+(success?1:0)},log:[...s.log,success?'Breeding succeeded. Egg transferred to incubation inventory.':'Breeding attempt failed. Both creatures are recovering.']};
 return {state:next,result:success?'success':'failure',egg};
}
