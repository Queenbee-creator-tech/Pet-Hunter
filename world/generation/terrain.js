// First reusable terrain-generation primitive for Avalora's production world engine.
// This module does not create or replace the canonical saved world.
export const WORLD_CONFIG = Object.freeze({
  width: 256, height: 256, cellMeters: 100,
  biomeTargets: Object.freeze({autumn: 30, spring: 25, summer: 25, winter: 20}),
  oceanInsideGrid: true
});
export function seededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}
export function smoothField(width, height, seed, passes = 4) {
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1 ||
      !Number.isInteger(passes) || passes < 0 || passes > 20) throw new RangeError('Invalid field dimensions or smoothing');
  const random = seededRandom(seed);
  let values = Float32Array.from({length: width * height}, () => random());
  for (let pass = 0; pass < passes; pass++) {
    const next = new Float32Array(values.length);
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
      let total = 0, count = 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const xx = x + dx, yy = y + dy;
        if (xx >= 0 && xx < width && yy >= 0 && yy < height) {
          total += values[yy * width + xx]; count++;
        }
      }
      next[y * width + x] = total / count;
    }
    values = next;
  }
  return values;
}
export function terrainMask(width, height, seed, coverage = 0.25, passes = 4) {
  if (!Number.isFinite(coverage) || coverage < 0 || coverage > 1) throw new RangeError('Coverage must be between 0 and 1');
  const field = smoothField(width, height, seed, passes);
  const count = Math.round(field.length * coverage);
  const indices = Array.from({length: field.length}, (_, i) => i);
  indices.sort((a, b) => field[b] - field[a] || a - b);
  const mask = new Uint8Array(field.length);
  for (let i = 0; i < count; i++) mask[indices[i]] = 1;
  return mask;
}
export function countConnectedComponents(mask, width, height) {
  if (mask.length !== width * height) throw new RangeError('Mask size does not match dimensions');
  const visited = new Uint8Array(mask.length);
  let components = 0;
  for (let start = 0; start < mask.length; start++) {
    if (!mask[start] || visited[start]) continue;
    components++;
    const stack = [start]; visited[start] = 1;
    while (stack.length) {
      const i = stack.pop(), x = i % width, y = Math.floor(i / width);
      for (const j of [x > 0 ? i - 1 : -1, x < width - 1 ? i + 1 : -1, y > 0 ? i - width : -1, y < height - 1 ? i + width : -1]) {
        if (j >= 0 && mask[j] && !visited[j]) {visited[j] = 1; stack.push(j);}
      }
    }
  }
  return components;
}
