import {BIOMES,fresh,leave,enter,decide} from './engine.js';
let s=fresh();const game=document.querySelector('#game'),stats=document.querySelector('#stats'),leaveButton=document.querySelector('#leave');
const p=(t)=>{const e=document.createElement('p');e.textContent=t;game.append(e)};
const heading=t=>{const e=document.createElement('h2');e.textContent=t;game.append(e)};
function button(label,fn,disabled=false){const e=document.createElement('button');e.className='choice';e.textContent=label;e.disabled=disabled;e.addEventListener('click',()=>{fn();render()});game.append(e)}
function render(){
 game.replaceChildren();stats.textContent='Hunter stamina: '+s.stamina+'/20  •  Eggs: '+s.inventory.eggs+'  •  Materials: '+s.inventory.materials+'  •  Creatures: '+s.inventory.creatures+'  •  Practice: '+s.skills;
 leaveButton.hidden=s.screen!=='explore';
 if(s.screen==='home'){heading('Home Sanctuary');p('Your expedition rewards are safe here. Choose a biome to explore.');p('TEST NOTE: Captures alternate success and failure so you can see both routes. These are not final capture odds.');BIOMES.forEach(b=>button('Explore '+b,()=>s=enter(s,b)));p('Latest events:');s.log.slice(-4).forEach(p);return;}
 heading(s.biome+' — Expedition');
 if(s.step==='trail'){p('You travel along a winding path. Strange marks interrupt the familiar terrain. What do you do?');button('Study the tracks',()=>s=decide(s,'observe'));button('Take the rocky shortcut',()=>s=decide(s,'shortcut'));}
 if(s.step==='clue'){p('The tracks lead toward a sheltered clearing. You hear movement ahead.');button('Follow the trail',()=>s=decide(s,'follow'));button('Avoid the clearing and keep moving',()=>s=decide(s,'avoid'));}
 if(s.step==='find'){p('Inside the clearing you spot a nest, loose crafting materials, and a skittish wild creature. Choose ONE opportunity for this test.');button('Collect materials (5 stamina)',()=>s=decide(s,'collect'),s.stamina<5);button('Collect an egg (5 stamina)',()=>s=decide(s,'egg'),s.stamina<5);button('Attempt creature capture (5 stamina)',()=>s=decide(s,'capture'),s.stamina<5);button('Leave the clearing without taking anything',()=>s=decide(s,'continue'));}
 if(s.step==='after'){if(s.lastOutcome)p(s.lastOutcome);p('The clearing grows quiet. You can keep exploring or leave with what you earned.');button('Continue exploring',()=>s=decide(s,'continue'));}
 p('Recent expedition events:');s.log.slice(-3).forEach(p);
}
leaveButton.addEventListener('click',()=>{if((s.step==='find'||s.step==='clue')&&!confirm('Leave exploration? Your current opportunity will end. Collected rewards and skills will be kept.'))return;s=leave(s);render()});
document.querySelector('#reset').addEventListener('click',()=>{if(confirm('Reset all prototype test progress?')){s=fresh();render()}});
render();