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
 const rng=seededRandom(seed),phase1=rng()*Math.PI*2,phase2=rng()*Math.PI*2;
 const l0=leftCount/height,r0=(leftCount+middleCount)/height,left=[],right=[];
 for(let y=0;y<height;y++){
  const t=y/height;
  left[y]=Math.max(1,Math.min(width-2,Math.round(l0+Math.sin(t*2*Math.PI+phase1)*Math.min(3,width*.018))));
  right[y]=Math.max(left[y]+1,Math.min(width-1,Math.round(r0+Math.sin(t*2*Math.PI+phase2)*Math.min(3,width*.018))));
 }
 function adjust(arr,target,min,max){
  let sum=arr.reduce((a,b)=>a+b,0),guard=0;
  while(sum!==target){
   if(++guard>width*height*2)throw new Error('Biome quota adjustment failed');
   const d=sum<target?1:-1;let best=-1,score=Infinity;
   for(let y=0;y<height;y++){
    const n=arr[y]+d;if(n<min(y)||n>max(y))continue;
    const prev=arr[Math.max(0,y-1)],next=arr[Math.min(height-1,y+1)];
    const cost=Math.abs(n-prev)+Math.abs(n-next)-Math.abs(arr[y]-prev)-Math.abs(arr[y]-next)+Math.abs(y-height/2)*.00001;
    if(cost<score){score=cost;best=y;}
   }
   if(best<0)throw new Error('No feasible biome boundary adjustment');
   arr[best]+=d;sum+=d;
  }
 }
 adjust(left,leftCount,()=>1,y=>right[y]-1);
 adjust(right,leftCount+middleCount,y=>left[y]+1,()=>width-1);
 return {left,right};
}
export function allocateBiomes(width=WORLD_CONFIG.width,height=WORLD_CONFIG.height,seed=1){
 if(!Number.isInteger(width)||!Number.isInteger(height)||width<8||height<8||!Number.isFinite(seed))
  throw new RangeError('Grid must be at least 8x8 and seed finite');
 const total=width*height,q=quotas(total),{left,right}=boundaries(width,height,seed,q[1]+q[3],q[0]);
 const cells=new Int8Array(total);
 for(let y=0;y<height;y++)for(let x=0;x<width;x++)
  cells[y*width+x]=x<left[y]?1:x<right[y]?0:2;
 let remainingSpring=q[1];
 for(let y=0;y<height;y++){
  const n=Math.min(remainingSpring,left[y]);
  for(let x=n;x<left[y];x++)cells[y*width+x]=3;
  remainingSpring-=n;
 }
 if(remainingSpring!==0)throw new Error('Spring quota impossible');
 return {width,height,seed,cells,counts:Object.fromEntries(BIOME_IDS.map((id,i)=>[id,q[i]]))};
}
