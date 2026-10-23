// Alpha v0.2: story onboarding is ONE-TIME setup, not a repeatable gameplay loop.
// All capture outcomes, rewards and costs are placeholders for testing, not final balance.
export const BIOMES=['Spring','Summer','Autumn','Winter'];
export function fresh(){return {screen:'intro',name:'',background:'',homeBiome:null,biome:null,step:'',stamina:20,inventory:{eggs:0,materials:0,creatures:0},incubating:0,skills:0,log:[],encounter:0,lastOutcome:''};}
export function leave(s){return {...s,screen:'sanctuary',step:'',biome:null,log:[...s.log,'Returned to the '+s.homeBiome+' sanctuary; rewards and practice retained.']};}
export function enter(s,biome){return {...s,screen:'explore',biome,step:'trail',encounter:s.encounter+1,lastOutcome:'',log:[...s.log,'Entered '+biome+'.']};}
export function decide(s,action){
 const next={...s,inventory:{...s.inventory},log:[...s.log],lastOutcome:''};
 if(action==='observe'){next.skills++;next.step='clue';next.log.push('Observed tracks (+1 test practice; no stamina spent).');}
 if(action==='shortcut'){next.skills++;next.step='clue';next.log.push('Navigated a rocky shortcut (+1 test practice; no stamina spent).');}
 if(action==='follow'){next.step='find';next.log.push('Followed the trail into a sheltered clearing.');}
 if(action==='avoid'){next.step='trail';next.log.push('Avoided the clearing and continued exploring.');}
 if(action==='collect'){if(next.stamina>=5){next.stamina-=5;next.inventory.materials++;next.lastOutcome='SUCCESS: You collected crafting materials.';next.log.push(next.lastOutcome+' (-5 stamina).');}next.step='after';}
 if(action==='egg'){if(next.stamina>=5){next.stamina-=5;next.inventory.eggs++;next.lastOutcome='SUCCESS: You collected an egg!';next.log.push(next.lastOutcome+' (-5 stamina).');}next.step='after';}
 if(action==='capture'){if(next.stamina>=5){next.stamina-=5;const success=next.encounter%2===1;if(success){next.inventory.creatures++;next.lastOutcome='SUCCESS: You captured the wild creature!';}else{next.lastOutcome='FAILED: The wild creature escaped this time.';}next.log.push(next.lastOutcome+' (-5 stamina).');next.encounter++;}next.step='after';}
 if(action==='continue'){next.step='trail';next.log.push('Continued exploration.');}
 return next;
}
