// Named interaction module for the paired lens and broad, non-solving hint region.
export function hintRegion(feature){return {x:Math.round(feature.x/110)*110,y:Math.round(feature.y/110)*110};}
export function lensScale(width){return width/900*2.2;}
export function updatePairedMagnifiers(panels,renderScene,chapter,position,visible){
 panels.forEach((panel,i)=>{
  let lens=panel.querySelector('.lens-window');if(!visible){lens?.remove();return;}
  if(!lens){lens=document.createElement('div');lens.className='lens-window';lens.innerHTML=renderScene(chapter,Boolean(i),`magnifier${i}`);panel.append(lens);}
  const bounds=panel.querySelector(':scope > svg').getBoundingClientRect(),size=innerWidth<=700?110:160,scale=lensScale(bounds.width);
  lens.style.left=Math.min(bounds.width-size/2,Math.max(size/2,position.x/900*bounds.width))+'px';lens.style.top=Math.min(bounds.height-size/2,Math.max(size/2,position.y/680*bounds.height))+'px';
  const svg=lens.firstElementChild;svg.style.width=900*scale+'px';svg.style.height=680*scale+'px';svg.style.left=size/2-position.x*scale+'px';svg.style.top=size/2-position.y*scale+'px';
 });
}
