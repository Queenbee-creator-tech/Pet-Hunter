// Care/training foundation. Creature-specific skills and treatment durations remain provisional.
export const TRAINING_MS=120000;
export const CARE_SLOTS=3;
export const TRAINING_SLOTS=3;
export const SKILL_CAP=50;
export const TEST_SKILLS=['Tracking','Agility','Swimming','Combat'];
export const TREATMENT_MS={minor:120000,moderate:300000,serious:600000};
const blank=()=>Array(3).fill(null);
export function normalizeCare(s){
 const slots=(x)=>{const a=Array.isArray(x)?x.slice(0,3):[];while(a.length<3)a.push(null);return a;};
 const creatures=(s.creatureItems||[]).map(c=>({...c,level:Number.isInteger(c.level)?c.level:1,health:Number.isFinite(c.health)?c.health:100,maxHealth:Number.isFinite(c.maxHealth)?c.maxHealth:100,energy:Number.isFinite(c.energy)?c.energy:100,maxEnergy:Number.isFinite(c.maxEnergy)?c.maxEnergy:100,stress:Number.isFinite(c.stress)?c.stress:0,fear:Number.isFinite(c.fear)?c.fear:0,injury:c.injury||'none',skills:c.skills&&typeof c.skills==='object'?{...c.skills}:{}}));
 return {...s,creatureItems:creatures,careSlots:slots(s.careSlots),trainingSlots:slots(s.trainingSlots)};
}
function occupied(s,id){return [...s.careSlots,...s.trainingSlots].some(x=>x?.creatureId===id)||s.breedingPairs?.some(p=>!p.claimed&&(p.firstId===id||p.secondId===id));}
export function careCandidates(s){s=normalizeCare(s);return s.creatureItems.filter(c=>!occupied(s,c.id)&&(c.injury!=='none'||c.health<c.maxHealth||c.energy<c.maxEnergy||c.stress>0||c.fear>0));}
export function trainingCandidates(s){s=normalizeCare(s);return s.creatureItems.filter(c=>!occupied(s,c.id)&&(c.cooldownUntil||0)<=Date.now());}
export function beginCare(s,id,slot,now=Date.now()){s=normalizeCare(s);if(s.screen!=='care'||!Number.isInteger(slot)||slot<0||slot>=3||s.careSlots[slot]||!careCandidates(s).some(c=>c.id===id))return s;
 const c=s.creatureItems.find(c=>c.id===id);const duration=TREATMENT_MS[c.injury]||120000;
 const a=[...s.careSlots];a[slot]={creatureId:id,startedAt:now,duration};return {...s,careSlots:a};}
export function finishCare(s,slot,now=Date.now()){s=normalizeCare(s);const a=s.careSlots[slot];if(s.screen!=='care'||!a||now<a.startedAt+a.duration)return s;
 const slots=[...s.careSlots];slots[slot]=null;return {...s,careSlots:slots,creatureItems:s.creatureItems.map(c=>c.id===a.creatureId?{...c,health:c.maxHealth,energy:c.maxEnergy,injury:'none',stress:0,fear:0}:c)};}
export function beginTraining(s,id,skill,slot,now=Date.now()){s=normalizeCare(s);if(s.screen!=='care'||!TEST_SKILLS.includes(skill)||!Number.isInteger(slot)||slot<0||slot>=3||s.trainingSlots[slot]||!trainingCandidates(s).some(c=>c.id===id))return s;
 const slots=[...s.trainingSlots];slots[slot]={creatureId:id,skill,startedAt:now};return {...s,trainingSlots:slots};}
export function finishTraining(s,slot,now=Date.now()){s=normalizeCare(s);const a=s.trainingSlots[slot];if(s.screen!=='care'||!a||now<a.startedAt+TRAINING_MS)return s;
 const slots=[...s.trainingSlots];slots[slot]=null;return {...s,trainingSlots:slots,creatureItems:s.creatureItems.map(c=>{if(c.id!==a.creatureId)return c;const old=c.skills[a.skill]||{level:1,xp:0};const xp=old.level>=SKILL_CAP?old.xp:old.xp+1;const level=Math.min(SKILL_CAP,old.level+(xp>=old.level*3?1:0));return {...c,skills:{...c.skills,[a.skill]:{level,xp:level>old.level?0:xp}}};})};}
