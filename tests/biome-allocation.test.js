import test from 'node:test';
import assert from 'node:assert/strict';
import {allocateBiomes, BIOME_IDS} from '../world/generation/biomes.js';
test('biome allocation fills every cell and matches approved target ratios',()=>{
 const world=allocateBiomes(32,32,1);
 assert.equal(world.cells.length,1024);
 assert.ok([...world.cells].every(v=>v>=0&&v<4));
 assert.equal(Object.values(world.counts).reduce((a,b)=>a+b,0),1024);
 for(const [id,share] of Object.entries({autumn:30,spring:25,summer:25,winter:20}))
   assert.ok(Math.abs(world.counts[id]/1024*100-share)<0.2,id);
});
test('biome allocation is reproducible',()=>{
 assert.deepEqual(allocateBiomes(24,24,5).cells,allocateBiomes(24,24,5).cells);
});
test('each biome forms one connected land region',()=>{
 const world=allocateBiomes(32,32,7),w=world.width,h=world.height;
 for(let b=0;b<BIOME_IDS.length;b++){
   const first=world.cells.indexOf(b),seen=new Set([first]),stack=[first];
   while(stack.length){const i=stack.pop(),x=i%w,y=Math.floor(i/w);
     for(const n of [x>0?i-1:-1,x<w-1?i+1:-1,y>0?i-w:-1,y<h-1?i+w:-1])
       if(n>=0&&world.cells[n]===b&&!seen.has(n)){seen.add(n);stack.push(n);}
   }
   assert.equal(seen.size,world.counts[BIOME_IDS[b]],BIOME_IDS[b]);
 }
});
