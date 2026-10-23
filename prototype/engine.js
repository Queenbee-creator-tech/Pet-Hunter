// Rule-based prototype engine; no AI or server. All numbers and outcomes are TEST VALUES.
export const BIOMES=['Spring','Summer','Autumn','Winter'];
export function fresh(){return {screen:'home',biome:null,step:'',stamina:20,inventory:{eggs:0,materials:0},skills:0,log:[],encounter:0};}
export function leave(s){return {...s,screen:'home',step:'',biome:null,log:[...s.log,'Returned to sanctuary; collected rewards and skill progress retained.']};}
export function enter(s,biome){return {...s,screen:'explore',biome,step:'trail',encounter:s.encounter+1,log:[...s.log,'Entered '+biome+'.']};}
export function decide(s,action){
 const next={...s,inventory:{...s.inventory},log:[...s.log]};
 if(action==='observe'){next.skills++;next.step='clue';next.log.push('Observed tracks (+1 test skill progress; no stamina spent).');}
 if(action==='shortcut'){next.skills++;next.step='clue';next.log.push('Navigated a rocky shortcut (+1 test skill progress; no stamina spent).');}
 if(action==='follow'){next.step='find';next.log.push('Followed the trail into a sheltered clearing.');}
 if(action==='avoid'){next.step='trail';next.log.push('Avoided the clearing and continued exploring.');}
 if(action==='collect'){if(next.stamina>=5){next.stamina-=5;next.inventory.materials++;next.log.push('Collected materials (-5 stamina).');}next.step='after';}
 if(action==='egg'){if(next.stamina>=5){next.stamina-=5;next.inventory.eggs++;next.log.push('Collected an egg (-5 stamina).');}next.step='after';}
 if(action==='capture'){if(next.stamina>=5){next.stamina-=5;next.log.push('Capture attempt failed (-5 stamina); creature escaped.');}next.step='after';}
 if(action==='continue'){next.step='trail';next.log.push('Continued exploration.');}
 return next;
}