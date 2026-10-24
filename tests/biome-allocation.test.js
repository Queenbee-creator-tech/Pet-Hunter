import test from 'node:test';
import assert from 'node:assert/strict';
import {allocateBiomes,BIOME_IDS} from '../world/generation/biomes.js';
function verify(w,h,seed){
 const result=allocateBiomes(w,h,seed),{cells,counts}=result;
 assert.equal(cells.length,w*h);
 for(let b=0;b<4;b++){
  const start=cells.indexOf(b);assert.ok(start>=0);
  const visited=new Uint8Array(w*h),stack=[start];visited[start]=1;let n=0;
  while(stack.length){
   const i=stack.pop(),x=i%w,y=(i/w)|0;n++;
   for(const j of [x>0?i-1:-1,x<w-1?i+1:-1,y>0?i-w:-1,y<h-1?i+w:-1])
    if(j>=0&&cells[j]===b&&!visited[j]){visited[j]=1;stack.push(j);}
  }
  assert.equal(n,counts[BIOME_IDS[b]],`disconnected ${BIOME_IDS[b]} at ${w}x${h} seed ${seed}`);
 }
 assert.equal(Object.values(counts).reduce((a,b)=>a+b,0),w*h);
 const autumnXs=[];for(let i=0;i<cells.length;i++)if(cells[i]===0)autumnXs.push(i%w);
 const avg=autumnXs.reduce((a,b)=>a+b,0)/autumnXs.length;
 assert.ok(avg>w*.35&&avg<w*.7,'Autumn not central');
 return result;
}
test('connected and exact at multiple sizes and seeds',()=>{
 for(const [w,h] of [[8,8],[16,16],[24,24],[32,32],[64,64],[128,128],[256,256]])
 for(const seed of [0,1,7,42,2026])verify(w,h,seed);
});
test('repeatable and seeded natural boundaries',()=>{
 assert.deepEqual(verify(256,256,42).cells,verify(256,256,42).cells);
 assert.notDeepEqual(verify(256,256,42).cells,verify(256,256,43).cells);
 const {cells,width:w,height:h}=verify(256,256,42);
 const first=Array.from({length:h},(_,y)=>cells.slice(y*w,(y+1)*w).indexOf(0));
 assert.ok(new Set(first).size>=3,'biome boundary is straight');
});
