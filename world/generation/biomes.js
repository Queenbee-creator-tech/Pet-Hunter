import {WORLD_CONFIG, seededRandom} from './terrain.js';

// Quota-exact, connected, seeded biome topology; not the canonical saved map.
// Autumn occupies a central band, Summer east, Spring/Winter west.
// Elevation, waterways, city landmarks, and Summer ocean are later passes.
export const BIOME_IDS=Object.freeze(['autumn','spring','summer','winter']);
function quotas(total){
 const exact=BIOME_IDS.map(id=>total*WORLD_CONFIG.biomeTargets[id]/100);
 const q=exact.map(Math.floor);
 const order=[0,1,2,3].sort((a,b)=>(exact[b]-q[b])-(exact[a]-q[a])||a-b);
 for(let i=0;i<total-q.reduce((a,b)=>a+b,0);i++)q[order[i]]++;
 return q;
}
function boundaries(width,height,seed,leftCount,middleCount){
 const rng=seededRandom(seed),p=Array.from({length:8},()=>rng()*Math.PI*2);
 const left=[],right=[],l0=leftCount/height,r0=(leftCount+middleCount)/height;
 const amp=Math.max(3,width*.105);
 for(let y=0;y<height;y++){
  const t=y/height;
  const wobble=(a,b,c)=>Math.sin(t*Math.PI*2+a)*.57+Math.sin(t*Math.PI*4+b)*.27+Math.sin(t*Math.PI*7+c)*.16+Math.sin(t*Math.PI*11+a*.7)*.11;
  left[y]=Math.round(l0+amp*wobble(p[0],p[1],p[2]));
  right[y]=Math.round(r0+amp*wobble(p[3],p[4],p[5]));
 }
 function adjust(arr,target,min,max){
  let sum=arr.reduce((a,b)=>a+b,0),step=0;
  while(sum!==target){
   if(step++>width*height*3)throw new Error('Biome quota adjustment failed');
   const d=sum<target?1:-1;
   let best=-1,score=Infinity;
   for(let y=0;y<height;y++){
    const n=arr[y]+d;if(n<min(y)||n>max(y))continue;
    const prev=arr[(y+height-1)%height],next=arr[(y+1)%height];
    const rough=Math.abs(n-prev)+Math.abs(n-next)-Math.abs(arr[y]-prev)-Math.abs(arr[y]-next);
    const drift=Math.abs(n-(arr===left?l0:r0));
    const cost=rough*2+drift*.015+Math.sin(y*2.39996+seed)*.005;
    if(cost<score){score=cost;best=y;}
   }
   if(best<0)throw new Error('No feasible biome boundary adjustment');
   arr[best]+=d;sum+=d;
  }
 }
 for(let y=0;y<height;y++){left[y]=Math.max(2,Math.min(width-3,left[y]));right[y]=Math.max(left[y]+2,Math.min(width-1,right[y]));}
 adjust(left,leftCount,()=>1,y=>right[y]-2);
 adjust(right,leftCount+middleCount,y=>left[y]+2,()=>width-1);
 return {left,right};
}
export function allocateBiomes(width=WORLD_CONFIG.width,height=WORLD_CONFIG.height,seed=1){
 if(!Number.isInteger(width)||!Number.isInteger(height)||width<8||height<8||!Number.isFinite(seed))
  throw new RangeError('Grid must be at least 8x8 and seed finite');
 const total=width*height,q=quotas(total),{left,right}=boundaries(width,height,seed,q[1]+q[3],q[0]);
 const cells=new Int8Array(total);
 for(let y=0;y<height;y++)for(let x=0;x<width;x++)
  cells[y*width+x]=x<left[y]?1:x<right[y]?0:2;
 // A wavy horizontal Spring/Winter boundary, with exact Spring quota.
 // Each column has a connected Spring cap and Winter remainder.
 const cut=new Int16Array(width);
 const phase=seededRandom(seed^0x7f4a7c15)()*Math.PI*2;
 for(let x=0;x<width;x++){
  const t=x/width;
  cut[x]=Math.max(1,Math.min(height-1,Math.round(height*.56+
   height*.12*Math.sin(t*2*Math.PI+phase)+height*.055*Math.sin(t*5*Math.PI+phase*.6)+height*.018*Math.sin(t*9*Math.PI+phase*1.3))));
 }
 function springCount(){
  let n=0;for(let y=0;y<height;y++)for(let x=0;x<left[y];x++)if(y<cut[x])n++;
  return n;
 }
 let current=springCount(),guard=0;
 while(current!==q[1]){
  if(guard++>total*3)throw new Error('Spring quota adjustment failed');
  const d=current<q[1]?1:-1;
  let best=-1,score=Infinity;
  for(let x=0;x<width;x++){
   const y=d>0?cut[x]:cut[x]-1;
   if(y<1||y>=height-1||x>=left[y])continue;
   const n=cut[x]+d;
   const near=(x>0?Math.abs(n-cut[x-1]):0)+(x<width-1?Math.abs(n-cut[x+1]):0);
   const old=(x>0?Math.abs(cut[x]-cut[x-1]):0)+(x<width-1?Math.abs(cut[x]-cut[x+1]):0);
   const cost=(near-old)*2+Math.abs(n-height*.56)*.001+Math.sin(x*2.21+seed)*.0001;
   if(cost<score){score=cost;best=x;}
  }
  if(best<0)throw new Error('Spring/Winter quota impossible');
  cut[best]+=d;current+=d;
 }
 for(let y=0;y<height;y++)for(let x=0;x<left[y];x++)
  cells[y*width+x]=y<cut[x]?1:3;
 return {width,height,seed,cells,counts:Object.fromEntries(BIOME_IDS.map((id,i)=>[id,q[i]]))};
}
