// HUD labels are named here so the dossier outline exposes the game's information architecture.
export function counterLabel(left,found,total){return `${left} differences left · ${found} of ${total} found`;}
export function shortcutLabel(key,label){return `${label} ${key}`;}
export function renderChapterNavigation(container,chapters,states,selected,onSelect){
 container.innerHTML=chapters.map((chapter,i)=>`<button data-chapter="${i}" class="${i===selected?'active':''}" aria-current="${i===selected?'step':'false'}" title="${chapter.name} · key ${i+1}"><span class="chapter-icon">${states[i].completed?'✓':i+1}</span><span>${chapter.short}<small>${chapter.features.length} changes${states[i].completed?' · complete':''}</small></span></button>`).join('');
 container.querySelectorAll('[data-chapter]').forEach(button=>button.onclick=()=>onSelect(Number(button.dataset.chapter)));
}
export function renderDiscoveryMarkers(panels,features,found){
 panels.forEach(panel=>{panel.querySelectorAll('.marker').forEach(el=>el.remove());for(const i of found){const f=features[i],marker=document.createElement('span');marker.className='marker';marker.style.left=f.x/9+'%';marker.style.top=f.y/6.8+'%';marker.style.width=Math.max(6.5,Math.min(12,f.r*2/9))+'%';marker.title=f.name;panel.append(marker);}});
}
