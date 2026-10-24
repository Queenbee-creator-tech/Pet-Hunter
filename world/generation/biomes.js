import {WORLD_CONFIG, seededRandom, smoothField} from './terrain.js';

// Prototype spatial allocation, not the final canonical Avalora geography.
// Growth from four distinct seeds produces contiguous, irregular biome regions.
// Ocean, landmarks, elevations and city placement are separate later passes.
export const BIOME_IDS = Object.freeze(['autumn','spring','summer','winter']);
export function allocateBiomes(width = WORLD_CONFIG.width, height = WORLD_CONFIG.height, seed = 1) {
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 4 || height < 4) throw new RangeError('Grid must be at least 4x4');
  const total = width * height;
  const target = BIOME_IDS.map(id => Math.floor(total * WORLD_CONFIG.biomeTargets[id] / 100));
  for (let i = 0; i < total - target.reduce((a,b)=>a+b,0); i++) target[i % 4]++;
  const cells = new Int8Array(total).fill(-1);
  const counts = [0,0,0,0];
  const frontiers = [[],[],[],[]];
  const rng = seededRandom(seed);
  const centers = [[0.5,0.5],[0.15,0.22],[0.85,0.75],[0.18,0.8]];
  const jitter = () => (rng() - 0.5) * 0.14;
  for (let b = 0; b < 4; b++) {
    const [fx,fy] = centers[b];
    const x = Math.max(0,Math.min(width-1,Math.floor((fx+jitter())*width)));
    const y = Math.max(0,Math.min(height-1,Math.floor((fy+jitter())*height)));
    const i = y*width+x;
    if (cells[i] !== -1) throw new Error('Overlapping biome seed; increase grid size');
    cells[i]=b; counts[b]++; frontiers[b].push(i);
  }
  const noise = smoothField(width,height,seed ^ 0xB10BE,3);
  const neighborIndices = i => {
    const x=i%width,y=Math.floor(i/width), n=[];
    if(x>0)n.push(i-1);if(x<width-1)n.push(i+1);
    if(y>0)n.push(i-width);if(y<height-1)n.push(i+width);
    return n;
  };
  // Select a boundary cell, expanding each biome until its exact target.
  // Lower-noise neighboring cells are preferred, with seed-driven variation.
  let assigned=4;
  while(assigned<total) {
    let progressed=false;
    for(let b=0;b<4;b++) {
      if(counts[b]>=target[b])continue;
      const options=[];
      for(const i of frontiers[b])for(const n of neighborIndices(i))if(cells[n]===-1)options.push(n);
      if(!options.length)continue;
      let best=options[0], score=Infinity;
      for(const n of options){const s=noise[n]+rng()*0.06;if(s<score){score=s;best=n;}}
      cells[best]=b;counts[b]++;assigned++;frontiers[b].push(best);progressed=true;
    }
    if(!progressed) {
      // If a biome is enclosed before meeting its quota, other regions
      // should not be silently reassigned: fail for design inspection.
      throw new Error('Biome allocation enclosed a region; adjust generation constraints');
    }
  }
  return {width,height,seed,cells,counts:Object.fromEntries(BIOME_IDS.map((id,i)=>[id,counts[i]]))};
}
