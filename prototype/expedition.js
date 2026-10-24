// Alpha expedition slice. All place/creature names and 15-minute duration are TEST placeholders.
export const RETURN_WINDOW_MS=15*60*1000;
export const AUTUMN_ROUTES=Object.freeze({
 sanctuary:['trail'],trail:['sanctuary','fork'],fork:['trail','clearing','ridge'],
 clearing:['fork'],ridge:['fork']
});
export const PLACE_NAMES={sanctuary:'Autumn Sanctuary',trail:'Leaf-strewn Trail',fork:'Woodland Fork',clearing:'Sheltered Clearing',ridge:'Rocky Ridge'};
export function beginExpedition(s){return {...s,location:'sanctuary',sightings:s.sightings||[],waypoint:s.waypoint||{crafted:false,mark:null}};}
export function adjacent(location){return AUTUMN_ROUTES[location]||[];}
export function move(s,to){if(!adjacent(s.location).includes(to))return s;return {...s,location:to};}
export function encounterCreature(s,{id,kind='Placeholder creature',now=Date.now(),duration=RETURN_WINDOW_MS}){
 if(!AUTUMN_ROUTES[s.location]||!id||!Number.isFinite(now)||duration<=0)return s;
 const sightings=s.sightings||[];
 if(sightings.some(x=>x.id===id))return s;
 return {...s,sightings:[...sightings,{id,kind,location:s.location,expiresAt:now+duration}]};
}
export function activeSighting(s,id,now=Date.now()){
 return (s.sightings||[]).find(x=>x.id===id&&now<x.expiresAt)||null;
}
export function returnToSighting(s,id,now=Date.now()){
 const x=activeSighting(s,id,now);
 return x&&x.location===s.location?x:null;
}
export function craftWaypoint(s,eligible=false){
 if(!eligible)return s; // Eligibility is supplied by the future crafting skill system.
 return {...s,waypoint:{crafted:true,mark:null}};
}
export function markWaypoint(s,id,now=Date.now()){
 const x=activeSighting(s,id,now);
 if(!s.waypoint?.crafted||!x)return s;
 return {...s,waypoint:{crafted:true,mark:id}};
}
export function waypointTarget(s,now=Date.now()){
 if(!s.waypoint?.crafted||!s.waypoint.mark)return null;
 return activeSighting(s,s.waypoint.mark,now);
}
export function expireWaypoint(s,now=Date.now()){
 return s.waypoint?.mark&&!waypointTarget(s,now)?{...s,waypoint:{...s.waypoint,mark:null}}:s;
}
function distance(from,to){
 if(from===to)return 0;
 const seen=new Set([from]);let frontier=[from],steps=0;
 while(frontier.length){steps++;const next=[];for(const p of frontier)for(const q of adjacent(p)){if(q===to)return steps;if(!seen.has(q)){seen.add(q);next.push(q);}}frontier=next;}
 return Infinity;
}
export function guidedChoices(s,now=Date.now()){
 const target=waypointTarget(s,now);
 if(!target)return [];
 const current=distance(s.location,target.location);
 return adjacent(s.location).filter(x=>distance(x,target.location)<current);
}
