import {WORLD_CONFIG} from './terrain.js';

// Safe baseline for biome allocation. This is NOT Avalora's final map:
// it uses contiguous bands as a temporary foundation. Natural irregular
// borders, Autumn-centered topology, terrain and waterways are future passes.
export const BIOME_IDS = Object.freeze(['autumn','spring','summer','winter']);

export function allocateBiomes(width = WORLD_CONFIG.width, height = WORLD_CONFIG.height, seed = 1) {
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 4 || height < 4)
    throw new RangeError('Grid must be at least 4x4');
  const total = width * height;
  const targets = BIOME_IDS.map(id => Math.floor(total * WORLD_CONFIG.biomeTargets[id] / 100));
  let remainder = total - targets.reduce((a,b)=>a+b,0);
  for(let b=0;remainder>0;b=(b+1)%4,remainder--)targets[b]++;
  const cells = new Int8Array(total);
  const counts = [0,0,0,0];
  // This safe scaffold is seed-independent; a later topology pass will use the seed.
  for(let y=0;y<height;y++){
    const remainingRows=height-y;
    const ideal=targets.map((t,b)=>(t-counts[b])/remainingRows);
    const widths=ideal.map(v=>Math.floor(v));
    let extras=width-widths.reduce((a,b)=>a+b,0);
    const order=[0,1,2,3].sort((a,b)=>(ideal[b]-widths[b])-(ideal[a]-widths[a])||a-b);
    for(let i=0;i<extras;i++)widths[order[i%4]]++;
    let x=0;
    for(let b=0;b<4;b++)for(let j=0;j<widths[b];j++)cells[y*width+x++]=b;
    if(x!==width)throw new Error('Invalid biome row');
    for(let b=0;b<4;b++)counts[b]+=widths[b];
  }
  if(counts.some((n,b)=>n!==targets[b]))throw new Error('Biome quota mismatch');
  return {width,height,seed,cells,counts:Object.fromEntries(BIOME_IDS.map((id,i)=>[id,counts[i]]))};
}
