import {allocateBiomes,BIOME_IDS} from './biomes.js';
import {WORLD_CONFIG,seededRandom} from './terrain.js';

// Preview geography only: does not persist or replace the canonical world.
export const TERRAIN=Object.freeze({MEADOW:0,GROVE:1,FOREST:2,MOUNTAIN:3,VALLEY:4,COAST:5,OCEAN:6,ISLAND:7,LAKE:8,RIVER:9,REEF:10,GLACIER:11});
const idx=(x,y,w)=>y*w+x;
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export function generateWorldDraft(seed=42,width=WORLD_CONFIG.width,height=WORLD_CONFIG.height){
 if(width<32||height<32)throw new RangeError('Draft geography requires at least 32 cells per axis');
 const {cells:biomes,counts}=allocateBiomes(width,height,seed);
 const rng=seededRandom(seed^0x9e3779b9),total=width*height;
 const terrain=new Uint8Array(total),elevation=new Int16Array(total),floatingHeight=new Int16Array(total),features=new Uint8Array(total);
 const regions=Array.from({length:4},()=>[]);
 for(let y=0;y<height;y++)for(let x=0;x<width;x++)regions[biomes[idx(x,y,width)]].push({x,y});
 function center(b){
  const points=regions[b],cx=points.reduce((s,p)=>s+p.x,0)/points.length,cy=points.reduce((s,p)=>s+p.y,0)/points.length;
  return points.reduce((best,p)=>!best||(p.x-cx)**2+(p.y-cy)**2<(best.x-cx)**2+(best.y-cy)**2?p:best,null);
 }
 const winter=center(3);
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  const i=idx(x,y,width),b=biomes[i];
  const wave=Math.sin(x*.035+seed*.03)*Math.cos(y*.049)*28+Math.sin(y*.075+x*.043)*16;
  if(b===0){elevation[i]=Math.round(110+wave);terrain[i]=Math.sin(x*.047+Math.sin(y*.029))*Math.cos(y*.058)+Math.sin(x*.083+y*.039)*.3+rng()*.14>.96?TERRAIN.GROVE:TERRAIN.MEADOW;}
  else if(b===1){elevation[i]=Math.round(220+wave);terrain[i]=TERRAIN.FOREST;}
  else if(b===2){elevation[i]=Math.round(16+wave*.3);terrain[i]=TERRAIN.COAST;}
  else{const d=Math.hypot((x-winter.x)*1.5,(y-winter.y)*1.2);const ridge=Math.abs(Math.sin(x*.065+y*.035+seed*.02))*360+Math.abs(Math.sin(y*.11-x*.025))*180;const valleyFactor=Math.exp(-d*d/(Math.max(4,width*.06)**2));elevation[i]=Math.round(300+ridge+wave*2-valleyFactor*300);terrain[i]=d<Math.max(3,width*.035)?TERRAIN.VALLEY:elevation[i]>720?TERRAIN.GLACIER:TERRAIN.MOUNTAIN;}
 }
 for(let y=0;y<height;y++){
  let first=width-1;for(let x=0;x<width;x++)if(biomes[idx(x,y,width)]===2){first=x;break;}
  for(let x=first;x<width;x++){
   const i=idx(x,y,width);if(biomes[i]!==2)continue;
   const depth=x-first,shore=clamp(Math.round(width*.035+Math.sin(y*.09+seed)*2),2,Math.max(3,width*.08));
   if(depth>shore){elevation[i]=-Math.min(80,depth*2);terrain[i]=depth<shore+3?TERRAIN.REEF:TERRAIN.OCEAN;}
  }
 }
 const islandX=clamp(Math.round(width*.92),1,width-2),islandY=clamp(Math.round(height*.55),2,height-3);
 for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++){
  const x=islandX+dx,y=islandY+dy,i=idx(x,y,width);
  if(biomes[i]===2&&dx*dx+dy*dy<=4){terrain[i]=TERRAIN.ISLAND;elevation[i]=5;}
 }
 // Offshore destination prototypes; turtle routes are graph edges, not capturable creatures.
 const summerIslands=[];
 for(const [fx,fy] of [[.89,.24],[.92,.55],[.88,.78]]){
  const cy=clamp(Math.round(height*fy),3,height-4);
  let cx=clamp(Math.round(width*fx),3,width-4);
  while(cx<width-3&&terrain[idx(cx,cy,width)]!==TERRAIN.OCEAN)cx++;
  if(terrain[idx(cx,cy,width)]!==TERRAIN.OCEAN)continue;
  for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){
   const x=cx+dx,y=cy+dy,i=idx(x,y,width);
   if(biomes[i]===2&&terrain[i]===TERRAIN.OCEAN&&dx*dx+dy*dy<=2){terrain[i]=TERRAIN.ISLAND;elevation[i]=5;}
  }
  summerIslands.push({x:cx,y:cy});
 }
 const underwaterDestinations=[];
 for(const [fx,fy] of [[.85,.36],[.86,.68]]){
  const y=clamp(Math.round(height*fy),1,height-2);
  let x=clamp(Math.round(width*fx),1,width-2);
  while(x<width-2&&terrain[idx(x,y,width)]!==TERRAIN.OCEAN&&terrain[idx(x,y,width)]!==TERRAIN.REEF)x++;
  if(terrain[idx(x,y,width)]===TERRAIN.OCEAN||terrain[idx(x,y,width)]===TERRAIN.REEF)
   underwaterDestinations.push({x,y,layer:'underwater'});
 }
 let riverY=-1;
 for(let y=Math.floor(height*.43);y>=Math.floor(height*.25);y--){
  const present=new Set();for(let x=0;x<width;x++)present.add(biomes[idx(x,y,width)]);
  if(present.has(1)&&present.has(0)&&present.has(2)&&!present.has(3)){riverY=y;break;}
 }
 if(riverY<0)throw new Error('No Spring–Autumn–Summer river corridor');
 const springXs=[],autumnXs=[],summerXs=[];
 for(let x=0;x<width;x++){const b=biomes[idx(x,riverY,width)];if(b===1)springXs.push(x);else if(b===0)autumnXs.push(x);else if(b===2)summerXs.push(x);}
 const sourceX=springXs[Math.floor(springXs.length*.5)],lakeX=autumnXs[Math.floor(autumnXs.length*.5)];
 const lakeRadius=Math.max(2,Math.round(Math.min(width,height)*.035));
 for(let dy=-lakeRadius;dy<=lakeRadius;dy++)for(let dx=-lakeRadius;dx<=lakeRadius;dx++){
  const x=lakeX+dx,y=riverY+dy;if(x<0||x>=width||y<0||y>=height)continue;
  const i=idx(x,y,width);if(biomes[i]===0&&dx*dx+dy*dy<=lakeRadius*lakeRadius){terrain[i]=TERRAIN.LAKE;features[i]|=2;elevation[i]=75;}
 }
 const river=[];
 for(let x=sourceX;x<width;x++){
  const y=clamp(riverY+Math.round(Math.sin((x-sourceX)*.065)*2+Math.sin((x-sourceX)*.14)*1),1,height-2);
  const i=idx(x,y,width),b=biomes[i];if(b===3)throw new Error('River intersects Winter');
  if(b===2&&terrain[i]===TERRAIN.OCEAN){river.push({x,y});break;}
  if(terrain[i]!==TERRAIN.LAKE&&terrain[i]!==TERRAIN.OCEAN){terrain[i]=TERRAIN.RIVER;features[i]|=1;}
  elevation[i]=x<=lakeX?Math.round(75+(lakeX-x)*145/Math.max(1,lakeX-sourceX)):Math.round(75-Math.min(75,(x-lakeX)*75/Math.max(1,width-lakeX-1)));
  river.push({x,y});
 }
 for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++){
  const x=sourceX+dx,y=riverY+dy;if(x<0||x>=width||y<0||y>=height)continue;
  const i=idx(x,y,width);if(biomes[i]===1&&dx*dx+dy*dy<=4){floatingHeight[i]=420;features[i]|=8;}
 }
 features[idx(sourceX,riverY,width)]|=4;
 const coastalX=summerXs[0],coastalCity={x:coastalX,y:riverY};
 const turtleRoutes=[
  ...summerIslands.map((destination,i)=>({id:'summer_island_'+(i+1),from:'summerCity',to:destination,transport:'giant_turtle',arrival:'island_landing'})),
  ...underwaterDestinations.map((destination,i)=>({id:'summer_underwater_'+(i+1),from:'summerCity',to:destination,transport:'giant_turtle',arrival:'water_surface_descent_point'}))
 ];
 const landmarks={summerCity:coastalCity,summerIslands,underwaterDestinations,springCity:{x:sourceX,y:riverY},autumnLake:{x:lakeX,y:riverY,radius:lakeRadius},autumnTown:{x:lakeX,y:clamp(riverY+lakeRadius+2,0,height-1)},winterCity:{x:winter.x,y:winter.y},summerCoast:{x:summerXs[0],y:riverY},summerIsland:{x:islandX,y:islandY}};
 return {schema:'avalora-world-draft-1',canonical:false,seed,width,height,biomeIds:BIOME_IDS,counts,biomes,terrain,elevation,floatingHeight,features,landmarks,river,turtleRoutes};
}
export function validateWorldDraft(world){
 const issues=[],{width:w,height:h,biomes,terrain,elevation,features,river,landmarks}=world;
 if(biomes.length!==w*h)issues.push('Incomplete grid');
 for(let i=1;i<river.length;i++){
  const a=river[i-1],b=river[i],ia=idx(a.x,a.y,w),ib=idx(b.x,b.y,w);
  if(Math.abs(a.x-b.x)>1||Math.abs(a.y-b.y)>1)issues.push('Disconnected river');
  if(elevation[ib]>elevation[ia] && terrain[ib]!==TERRAIN.OCEAN)issues.push('Uphill river');
 }
 if(!river.some(p=>biomes[idx(p.x,p.y,w)]===0)||!river.some(p=>biomes[idx(p.x,p.y,w)]===2))issues.push('River missing Autumn or Summer');
 const city=landmarks.springCity,ci=idx(city.x,city.y,w);
 if(biomes[ci]!==1||!(features[ci]&8)||!(features[ci]&4))issues.push('Spring floating city waterfall missing');
 const winter=landmarks.winterCity,wi=idx(winter.x,winter.y,w);
 if(biomes[wi]!==3||terrain[wi]!==TERRAIN.VALLEY)issues.push('Winter city not in valley');
 if(!terrain.includes(TERRAIN.OCEAN))issues.push('Summer ocean missing');
 const summerCity=landmarks.summerCity;
 if(!summerCity||biomes[idx(summerCity.x,summerCity.y,w)]!==2)issues.push('Summer coastal city missing');
 if(!landmarks.summerIslands?.length)issues.push('Summer offshore islands missing');
 if(!landmarks.underwaterDestinations?.length)issues.push('Summer underwater destinations missing');
 if(!world.turtleRoutes?.length)issues.push('Summer turtle transport routes missing');
 if(!terrain.includes(TERRAIN.LAKE))issues.push('Autumn lake missing');
 return {ok:issues.length===0,issues};
}
