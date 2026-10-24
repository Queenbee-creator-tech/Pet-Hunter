// Temporary end-to-end alpha loop; not final crafting recipes or incubation rules.
export function craftTestKit(s){
 if(s.screen!=='craft'||s.inventory.materials<1)return s;
 return {...s,inventory:{...s.inventory,materials:s.inventory.materials-1},testKits:(s.testKits||0)+1,log:[...s.log,'Crafted one temporary field kit.']};
}
export function placeTestEgg(s){
 if(s.screen!=='incubation'||s.inventory.eggs<1)return s;
 return {...s,inventory:{...s.inventory,eggs:s.inventory.eggs-1},incubating:s.incubating+1,log:[...s.log,'Placed an egg in the test incubator.']};
}
export function hatchTestEgg(s){
 if(s.screen!=='incubation'||s.incubating<1)return s;
 return {...s,incubating:s.incubating-1,inventory:{...s.inventory,creatures:s.inventory.creatures+1},testHatched:(s.testHatched||0)+1,log:[...s.log,'TEST HATCH: one egg became a placeholder creature.']};
}
export function useTestKit(s){
 if(s.screen!=='explore'||(s.testKits||0)<1)return s;
 return {...s,testKits:s.testKits-1,log:[...s.log,'Used a temporary field kit during exploration (no bonus implemented).']};
}
