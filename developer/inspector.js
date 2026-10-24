import {generateWorldDraft,validateWorldDraft,TERRAIN} from '../world/generation/world.js';
const $=id=>document.getElementById(id),canvas=$('map'),ctx=canvas.getContext('2d');
const BIOME_COLORS=['#c28a48','#66a778','#dfbb6c','#b7d8ed'];
const TERRAIN_COLORS=['#bda568','#a27643','#3d805b','#707a89','#94a0a6','#f1c981','#21669c','#70ae81','#58b9cf','#4b9ed0','#5bc2ba','#e8f3f6'];
const LABELS=Object.keys(TERRAIN);
let world;
function put(parent,text,cls){const p=document.createElement('p');p.textContent=text;if(cls)p.className=cls;parent.append(p);return p;}
function marker(p,color,label){if(!p)return;const x=p.x+.5,y=p.y+.5;ctx.beginPath();ctx.arc(x,y,2.2,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();ctx.strokeStyle='#152029';ctx.lineWidth=.8;ctx.stroke();if(label){ctx.fillStyle='#fff';ctx.font='5px sans-serif';ctx.fillText(label,x+3,y-2);}}
function draw(){
 if(!world)return;
 const layer=$('layer').value,{width:w,height:h}=world;
 canvas.width=w;canvas.height=h;
 const img=ctx.createImageData(w,h);
 let lo=Infinity,hi=-Infinity;
 if(layer==='elevation')for(const n of world.elevation){lo=Math.min(lo,n);hi=Math.max(hi,n);}
 for(let i=0;i<w*h;i++){
  let color;
  if(layer==='biome')color=BIOME_COLORS[world.biomes[i]];
  else if(layer==='terrain')color=TERRAIN_COLORS[world.terrain[i]];
  else if(layer==='floating')color=world.floatingHeight[i]?'#dfb4ff':TERRAIN_COLORS[world.terrain[i]];
  else {const v=Math.max(0,Math.min(255,Math.round((world.elevation[i]-lo)/(hi-lo||1)*255)));color='#'+[v,v,v].map(n=>n.toString(16).padStart(2,'0')).join('');}
  const n=i*4;img.data[n]=parseInt(color.slice(1,3),16);img.data[n+1]=parseInt(color.slice(3,5),16);img.data[n+2]=parseInt(color.slice(5,7),16);img.data[n+3]=255;
 }
 ctx.putImageData(img,0,0);
 if($('routes').checked){
  ctx.lineWidth=1;ctx.strokeStyle='#b1f5ff';ctx.beginPath();
  world.river.forEach((p,i)=>i?ctx.lineTo(p.x+.5,p.y+.5):ctx.moveTo(p.x+.5,p.y+.5));ctx.stroke();
  ctx.setLineDash([2,2]);ctx.strokeStyle='#fff0a8';
  for(const route of world.turtleRoutes){ctx.beginPath();ctx.moveTo(world.landmarks.summerCity.x,world.landmarks.summerCity.y);ctx.lineTo(route.to.x,route.to.y);ctx.stroke();}
  ctx.setLineDash([]);
 }
 if($('landmarks').checked){
  for(const [name,p] of Object.entries(world.landmarks)){
   if(Array.isArray(p)){p.forEach((point,i)=>marker(point,'#f2c8ff',name.slice(0,4)+(i+1)));continue;}
   marker(p,'#ffec7d',name.replace(/[a-z]/g,'').slice(0,5));
  }
 }
}
function render(){
 const seed=Number($('seed').value);
 try{world=generateWorldDraft(seed);const v=validateWorldDraft(world);$('validation').replaceChildren();put($('validation'),v.ok?'Basic draft checks passed':'Issues found: '+v.issues.length,v.ok?'ok':'bad');for(const issue of v.issues)put($('validation'),issue,'bad');
 $('counts').replaceChildren();for(const [name,count] of Object.entries(world.counts))put($('counts'),name+': '+count.toLocaleString()+' cells ('+(count/world.biomes.length*100).toFixed(2)+'%)');
 $('locations').replaceChildren();for(const [name,p] of Object.entries(world.landmarks)){if(Array.isArray(p)){put($('locations'),name+': '+p.map(v=>v.x+','+v.y).join(' · '));}else put($('locations'),name+': '+p.x+','+p.y);}
 put($('locations'),'Turtle routes: '+world.turtleRoutes.length+' (coast → landing / descent point)');
 $('legend').replaceChildren();const layer=$('layer').value,colors=layer==='biome'?BIOME_COLORS:TERRAIN_COLORS,names=layer==='biome'?['Autumn','Spring','Summer','Winter']:LABELS;
 if(layer==='terrain'||layer==='biome')names.forEach((n,i)=>{const div=document.createElement('div');div.className='legend-row';const s=document.createElement('span');s.className='swatch';s.style.background=colors[i];div.append(s,document.createTextNode(n));$('legend').append(div);});
 else put($('legend'),layer==='floating'?'Purple indicates floating land; other colors show terrain.':'Dark = low, light = high.');
 draw();
 }catch(e){world=null;$('validation').replaceChildren();put($('validation'),'Generation failed: '+e.message,'bad');ctx.clearRect(0,0,canvas.width,canvas.height);}
}
canvas.addEventListener('pointermove',inspect);canvas.addEventListener('click',inspect);
function inspect(e){if(!world)return;const rect=canvas.getBoundingClientRect(),x=Math.min(world.width-1,Math.max(0,Math.floor((e.clientX-rect.left)*world.width/rect.width))),y=Math.min(world.height-1,Math.max(0,Math.floor((e.clientY-rect.top)*world.height/rect.height))),i=y*world.width+x;
 $('hover').textContent='Cell ('+x+', '+y+') · '+['Autumn','Spring','Summer','Winter'][world.biomes[i]]+' · '+LABELS[world.terrain[i]]+' · elevation '+world.elevation[i]+' m'+(world.floatingHeight[i]?' · floating height '+world.floatingHeight[i]+' m':'');}
$('generate').addEventListener('click',render);
for(const id of ['layer','landmarks','routes'])$(id).addEventListener('change',()=>world?(id==='layer'?renderLegendAndDraw():draw()):null);
function renderLegendAndDraw(){const layer=$('layer').value,colors=layer==='biome'?BIOME_COLORS:TERRAIN_COLORS,names=layer==='biome'?['Autumn','Spring','Summer','Winter']:LABELS;$('legend').replaceChildren();if(layer==='terrain'||layer==='biome')names.forEach((n,i)=>{const div=document.createElement('div');div.className='legend-row';const s=document.createElement('span');s.className='swatch';s.style.background=colors[i];div.append(s,document.createTextNode(n));$('legend').append(div);});else put($('legend'),layer==='floating'?'Purple = floating land.':'Grayscale elevation, darker = lower.');draw();}
$('export').addEventListener('click',()=>{if(!world)return;const data={...world,biomes:Array.from(world.biomes),terrain:Array.from(world.terrain),elevation:Array.from(world.elevation),floatingHeight:Array.from(world.floatingHeight),features:Array.from(world.features)};const blob=new Blob([JSON.stringify(data)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='avalora-DRAFT-seed-'+world.seed+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
render();
