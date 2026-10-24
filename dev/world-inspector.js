import {generateWorldDraft,validateWorldDraft,TERRAIN} from '../world/generation/world.js';
const $=id=>document.getElementById(id),canvas=$('map'),ctx=canvas.getContext('2d');
const biomeColors=['#b8793d','#79bc73','#e9bc71','#c5d9e8'];
const terrainColors=['#bd9c5b','#657c42','#3f8a59','#7b8291','#8ca08d','#d6bf82','#185b88','#e4d7a3','#4b9ac3','#458cc3','#4e9fa2','#e4f4fa'];
const names=Object.fromEntries(Object.entries(TERRAIN).map(([k,v])=>[v,k.toLowerCase().replaceAll('_',' ')]));
let world=null,selected=null;
const at=(x,y)=>y*world.width+x;
function color(i,layer){
 if(layer==='biomes')return biomeColors[world.biomes[i]];
 if(layer==='terrain')return terrainColors[world.terrain[i]];
 if(layer==='floating')return world.floatingHeight[i]>0?'#e5d8fc':'#233944';
 const n=world.elevation[i];return n<0?'#17496d':n<100?'#476b51':n<250?'#89a46c':n<650?'#8a8b87':'#edf3f4';
}
function paint(){
 if(!world)return;
 const {width:w,height:h}=world,layer=$('layer').value;
 canvas.width=w;canvas.height=h;
 const image=ctx.createImageData(w,h);
 for(let i=0;i<w*h;i++){
  const hex=color(i,layer);const n=parseInt(hex.slice(1),16),p=i*4;
  image.data[p]=(n>>16)&255;image.data[p+1]=(n>>8)&255;image.data[p+2]=n&255;image.data[p+3]=255;
 }
 ctx.putImageData(image,0,0);
 if($('markers').checked){
  ctx.lineWidth=.9;ctx.strokeStyle='#f7f7fa';ctx.beginPath();
  for(const route of (layer==='floating'?[]:world.turtleRoutes)){const a=world.landmarks.summerCity,b=route.to;ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);}
  ctx.stroke();
  const landmarks=world.landmarks;
  const markers=[['Spring city',landmarks.springCity,'#f6eaa4'],['Autumn lake',landmarks.autumnLake,'#c1f3ff'],['Autumn town',landmarks.autumnTown,'#fff0ac'],['Winter city',landmarks.winterCity,'#ff8f8f'],['Summer city',landmarks.summerCity,'#f6eaa4'],...landmarks.summerIslands.map(p=>['Island',p,'#fff']),...landmarks.underwaterDestinations.map(p=>['Underwater descent',p,'#86edfa'])];
  for(const [name,p,fill] of markers){ctx.beginPath();ctx.arc(p.x+.5,p.y+.5,2.5,0,Math.PI*2);ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle='#18212b';ctx.lineWidth=.6;ctx.stroke();}
 }
 if(selected){ctx.strokeStyle='#ff52c4';ctx.lineWidth=1;ctx.strokeRect(selected.x-2,selected.y-2,5,5);}
 $('legend').replaceChildren();
 const entries=layer==='biomes'?['Autumn','Spring','Summer','Winter'].map((n,i)=>[n,biomeColors[i]]):layer==='terrain'?Object.entries(TERRAIN).map(([n,i])=>[n.toLowerCase(),terrainColors[i]]):layer==='floating'?[['Floating land','#e5d8fc'],['Ground','#233944']]:[['Ocean','#17496d'],['Low','#476b51'],['Mid','#89a46c'],['High','#8a8b87'],['Peaks','#edf3f4']];
 for(const [label,color] of entries){const e=document.createElement('span');e.textContent=label;e.style.borderLeft='8px solid '+color;$('legend').append(e);}
}
function inspect(x,y){
 selected={x,y};const i=at(x,y);
 $('details').textContent=`Cell (${x}, ${y})\nBiome: ${world.biomeIds[world.biomes[i]]}\nTerrain: ${names[world.terrain[i]]}\nElevation: ${world.elevation[i]} draft units\nFloating height: ${world.floatingHeight[i]} draft units\nFeature flags: ${world.features[i]}`;
 paint();
}
function generate(){
 try{
  const seed=Number($('seed').value);if(!Number.isSafeInteger(seed)||seed<0||seed>2147483647)throw Error('Enter a whole-number seed from 0 to 2147483647');
  world=generateWorldDraft(seed);selected=null;
  const report=validateWorldDraft(world);
  $('status').textContent=report.ok?'PASS — structural checks':'ISSUES — '+report.issues.join('; ');
  $('status').dataset.valid=String(report.ok);
  $('counts').textContent=Object.entries(world.counts).map(([n,count])=>`${n}: ${count.toLocaleString()} (${(100*count/(world.width*world.height)).toFixed(1)}%)`).join(' · ');
  $('details').textContent='Click or tap the map to inspect a cell.';
  const p=world.landmarks;
  $('places').textContent=`Spring floating city: (${p.springCity.x},${p.springCity.y})\nAutumn lake: (${p.autumnLake.x},${p.autumnLake.y})\nAutumn town: (${p.autumnTown.x},${p.autumnTown.y})\nWinter valley city: (${p.winterCity.x},${p.winterCity.y})\nSummer coastal city: (${p.summerCity.x},${p.summerCity.y})\nTurtle routes: ${world.turtleRoutes.length} (surface transport only)`;
  $('places').style.whiteSpace='pre-line';paint();
 }catch(error){$('status').textContent='ERROR — '+error.message;$('status').dataset.valid='false';}
}
canvas.addEventListener('click',event=>{
 if(!world)return;const box=canvas.getBoundingClientRect(),x=Math.min(world.width-1,Math.max(0,Math.floor((event.clientX-box.left)/box.width*world.width))),y=Math.min(world.height-1,Math.max(0,Math.floor((event.clientY-box.top)/box.height*world.height)));inspect(x,y);
});
$('generate').addEventListener('click',generate);$('layer').addEventListener('change',paint);$('markers').addEventListener('change',paint);generate();
