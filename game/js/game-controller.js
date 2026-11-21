import {chapters,totalDifferences} from './chapters-data.js';
import {sceneMarkup} from './illustration-renderer.js';
import {playSoundEffect,setAudioEnabled,audioDiagnostics} from './audio-synth.js';
import {nearestDifference,awardDiscovery,applyMissPenalty,remainingDifferences} from './difference-engine.js';
import {hintRegion,updatePairedMagnifiers} from './magnifier-hint.js';
import {installKeyboardControls} from './keyboard-input.js';
import {counterLabel,renderChapterNavigation,renderDiscoveryMarkers} from './hud-ui.js';
import {readProgress,writeProgress,cleanChapter} from './progress-storage.js';

const $=id=>document.getElementById(id);
const panels=[$('original'),$('changed')];
const saved=readProgress();
const states=chapters.map((c,i)=>cleanChapter(saved?.chapters?.[i],c.features.length,c.time));
let chapter=Number.isInteger(saved?.chapter)?Math.min(chapters.length-1,Math.max(0,saved.chapter)):0;
let relaxed=saved?.relaxed===true,sound=saved?.sound===true,paused=false,lens=false,streak=0;
let pointer={x:450,y:340},keyboardPointer=false,hintFeature=null,hintUntil=0,lastMiss=-1000;
let lastFrame=performance.now(),lastSave=lastFrame,frames=0,frameStart=lastFrame,fps=60;
let toastTimeout,modalPurpose='';
const current=()=>states[chapter];
const definition=()=>chapters[chapter];
const complete=()=>current().found.length===definition().features.length;
const timeText=t=>`${String(Math.floor(Math.ceil(t)/60)).padStart(2,'0')}:${String(Math.ceil(t)%60).padStart(2,'0')}`;
function notify(message,duration=3000){$('toast').textContent=message;$('toast').classList.add('show');$('announcement').textContent=message;clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>$('toast').classList.remove('show'),duration);}
function persist(){const ok=writeProgress({chapter,relaxed,sound,chapters:states});$('save-status').textContent=ok?'Progress saved on this device':'Progress lasts until this page closes';}
function chime(kind){setAudioEnabled(sound);playSoundEffect(kind,streak);}

function renderChapterTabs(){
 renderChapterNavigation(document.querySelector('.worlds'),chapters,states,chapter,selectChapter);
}
function renderChapter(){
 const d=definition();hintFeature=null;hintUntil=0;streak=0;paused=false;keyboardPointer=false;pointer={x:450,y:340};
 $('chapter-number').textContent=`Chapter ${chapter+1} of ${chapters.length} · ${d.difficulty.split(' · ')[0]}`;
 $('scene-name').textContent=d.name;$('scene-story').textContent=d.subtitle;
 panels.forEach((p,i)=>{p.innerHTML=sceneMarkup(chapter,Boolean(i),`scene${i}`);p.classList.remove('paused');});
 renderChapterTabs();renderStatus();renderMarks();lastFrame=performance.now();persist();
}
function renderStatus(){
 const d=definition(),s=current(),left=remainingDifferences(d.features.length,s.found);
 $('remaining').textContent=left;$('found-count').textContent=`${s.found.length} of ${d.features.length} found`;$('header-progress').textContent=$('found-count').textContent;document.querySelector('.remaining').setAttribute('aria-label',counterLabel(left,s.found.length,d.features.length));
 $('timer').textContent=relaxed?'∞':timeText(s.remaining);$('timer-label').textContent=relaxed?'Take your time':'Time left';
 $('time-fill').style.transform=`scaleX(${relaxed?1:s.remaining/d.time})`;
 document.querySelector('.time-track').classList.toggle('urgent',!relaxed&&s.remaining<30);document.querySelector('.clock').classList.toggle('urgent',!relaxed&&s.remaining<30);
 $('progress-dots').innerHTML=d.features.map((_,i)=>`<i class="${i<s.found.length?'found':''}"></i>`).join('');
 $('hint-count').textContent=s.hints;$('hint').disabled=complete()||s.hints===0||paused||(!relaxed&&s.remaining<=0);
 $('mode').innerHTML=`${relaxed?'Timed mode':'Relaxed mode'} <kbd>R</kbd>`;$('mode').setAttribute('aria-pressed',String(relaxed));
 $('lens').setAttribute('aria-pressed',String(lens));$('sound').textContent=sound?'Sound on':'Sound off';$('sound').setAttribute('aria-label',sound?'Turn sound off':'Turn sound on');
 $('pause').textContent=paused?'▶':'Ⅱ';$('pause').setAttribute('aria-label',paused?'Resume game':'Pause game');
 const total=states.reduce((n,c)=>n+c.points,0);$('score').textContent=`${total.toLocaleString('en-US')} points`;
 const found=s.found.slice(-3).map(i=>`<span class="discovery">${d.features[i].name}</span>`).join('');
 $('discoveries').innerHTML=found||'<span class="empty-note">Every little detail has a story. Find your first one.</span>';
}
function renderMarks(){
 const s=current(),d=definition();
 panels.forEach(p=>{
  p.querySelectorAll('.marker,.hint-region,.crosshair').forEach(e=>e.remove());
  if(hintFeature!==null&&performance.now()<hintUntil){const f=hintRegion(d.features[hintFeature]),m=document.createElement('span');m.className='hint-region';m.style.left=Math.min(790,Math.max(110,f.x))/9+'%';m.style.top=Math.min(570,Math.max(110,f.y))/6.8+'%';p.append(m);}
  if(keyboardPointer){const m=document.createElement('span');m.className='crosshair';m.style.left=pointer.x/9+'%';m.style.top=pointer.y/6.8+'%';p.append(m);}
 });
 renderDiscoveryMarkers(panels,d.features,s.found);
}
function canPlay(){return !paused&&!$('modal').open&&!complete()&&(relaxed||current().remaining>0);}
function guessDifference(x,y){
 if(!canPlay())return;
 const d=definition(),s=current();
  const hit=nearestDifference(d.features,x,y);
 if(hit>=0){
  if(s.found.includes(hit)){notify('Already in your field notes. Keep looking.');return;}
  streak++;awardDiscovery(s,hit,streak);
  if(hintFeature===hit){hintFeature=null;hintUntil=0;}
  chime('find');renderStatus();renderMarks();persist();
  const left=d.features.length-s.found.length;
  notify(`${d.features[hit].name} found!${streak>1?` A streak of ${streak}.`:''} ${left?`${left} left to find.`:'Chapter complete!'}`);
  if(complete()){s.completed=true;persist();renderChapterTabs();setTimeout(showCompleted,650);}
 }else if(performance.now()-lastMiss>650){
  lastMiss=performance.now();streak=0;applyMissPenalty(s,relaxed);
  panels.forEach(p=>{const m=document.createElement('span');m.className='wrong';m.textContent='×';m.style.left=x/9+'%';m.style.top=y/6.8+'%';p.append(m);setTimeout(()=>m.remove(),800);});
  notify(relaxed?'Those details match. Try another spot.':'Those details match. 8 seconds off the clock.');chime('miss');renderStatus();persist();
 }
}
function selectChapter(index){
 if(index<0||index>=chapters.length)return;
 if($('modal').open)$('modal').close();chapter=index;renderChapter();
 if(current().remaining<=0&&!complete()&&!relaxed)showTimeout();
}
function showHint(){
 if(!canPlay()||current().hints<=0)return;
 const index=definition().features.findIndex((_,i)=>!current().found.includes(i)&&i!==hintFeature);
 hintFeature=index<0?definition().features.findIndex((_,i)=>!current().found.includes(i)):index;
 current().hints--;hintUntil=performance.now()+9000;streak=0;chime('hint');
 notify(definition().features[hintFeature].clue,6500);renderStatus();renderMarks();persist();
}
function setPaused(value){
 paused=value;panels.forEach(p=>p.classList.toggle('paused',paused));renderStatus();
 if(value)openModal('pause',`<span class="medal">Ⅱ</span><h2>A little breathing room.</h2><p>Your clock is paused and the pictures are tucked away. Come back when you’re ready.</p><div class="modal-actions"><button class="primary" data-action="resume">Continue the hunt</button></div>`);
}
function openModal(purpose,markup){modalPurpose=purpose;$('modal-content').innerHTML=markup;if(!$('modal').open)$('modal').showModal();$('modal-content').querySelectorAll('[data-action]').forEach(b=>b.onclick=()=>handleAction(b.dataset.action));}
function closeModal(){const purpose=modalPurpose;$('modal').close();if(purpose==='pause'||purpose==='help'){paused=false;panels.forEach(p=>p.classList.remove('paused'));renderStatus();lastFrame=performance.now();}}
function showCompleted(){
 if(!complete())return;chime('win');
 const s=current(),all=states.every(c=>c.completed),elapsed=definition().time-s.remaining;
 openModal('complete',`<span class="medal">✧</span><h2>${all?'Every little secret, found.':'A world put right.'}</h2><p>${all?`You found all ${totalDifferences} differences across six illustrated worlds. Thanks for looking a little closer.`:`You’ve found all ${definition().features.length} changes in ${definition().name.replace('The ','the ')}. Another little world is waiting.`}</p><div class="result-stats"><span>Discoveries<strong>${all?totalDifferences:s.found.length}</strong></span><span>Chapter score<strong>${s.points}</strong></span><span>${relaxed?'Mode':'Time used'}<strong>${relaxed?'Relaxed':timeText(elapsed)}</strong></span></div><div class="modal-actions"><button class="primary" data-action="${all?'replay':'next'}">${all?'Play this chapter again':'Visit the next world'}</button><button data-action="close">Stay a little</button></div>`);
}
function showTimeout(){
 if(relaxed||complete())return;openModal('timeout',`<span class="medal">◷</span><h2>No need to rush.</h2><p>The clock ran out, but there are still ${definition().features.length-current().found.length} secrets to discover. Keep your finds and continue without a timer, or begin this chapter again.</p><div class="modal-actions"><button class="primary" data-action="relax">Continue relaxed</button><button data-action="replay">Try again</button></div>`);persist();
}
function requestRestart(){openModal('restart','<h2>Begin this chapter again?</h2><p>This clears the finds, points and hints for this chapter. Your other chapters stay in your field notes.</p><div class="modal-actions"><button class="primary" data-action="replay">Restart chapter</button><button data-action="close">Keep looking</button></div>');}
function handleAction(action){
 if(action==='resume'||action==='close'){closeModal();return;}
 $('modal').close();
 if(action==='next'){selectChapter((chapter+1)%chapters.length);return;}
 if(action==='replay'){states[chapter]=cleanChapter(null,definition().features.length,definition().time);renderChapter();return;}
 if(action==='relax'){relaxed=true;paused=false;renderStatus();persist();lastFrame=performance.now();}
}
function showHelp(){
 paused=true;panels.forEach(p=>p.classList.add('paused'));renderStatus();
 openModal('help',`<h2>A little closer.</h2><p>Find the things that change between the two pictures. Click either picture to mark a difference in both. Each discovery is worth 100 points; consecutive finds earn a bonus.</p><p><b>Take your time.</b> Six chapters hide ${totalDifferences} differences. A wrong guess costs 8 seconds in timed mode. Relaxed mode has no clock or time penalties.</p><p><b>Need a nudge?</b> Each chapter has three hints. A hint offers a clue and briefly highlights a broad area, without finding the answer for you.</p><p><b>Keyboard:</b> focus a picture, use arrows to move and Enter or Space to mark. Hold Shift for fine movement. H offers a hint, M toggles the paired magnifiers, R toggles relaxed mode, P pauses, and 1–6 selects a chapter. Tab reaches every HUD control.</p><div class="modal-actions"><button class="primary" data-action="resume">Let’s look</button></div>`);
}
function updateMagnifiers(x,y,visible=true){
 updatePairedMagnifiers(panels,sceneMarkup,chapter,{x,y},lens&&visible&&canPlay());
}
panels.forEach(p=>{
 const position=e=>{const b=p.querySelector(':scope > svg').getBoundingClientRect();return{x:Math.max(0,Math.min(900,(e.clientX-b.left)/b.width*900)),y:Math.max(0,Math.min(680,(e.clientY-b.top)/b.height*680))};};
 p.addEventListener('pointerdown',e=>{if(e.button!==0)return;pointer=position(e);keyboardPointer=false;guessDifference(pointer.x,pointer.y);renderMarks();});
 p.addEventListener('pointermove',e=>{pointer=position(e);if(keyboardPointer){keyboardPointer=false;renderMarks();}updateMagnifiers(pointer.x,pointer.y);});
 p.addEventListener('pointerleave',()=>updateMagnifiers(0,0,false));
 p.addEventListener('focus',()=>{keyboardPointer=p.matches(':focus-visible');renderMarks();});
 p.addEventListener('blur',()=>{keyboardPointer=false;renderMarks();});
});
$('hint').onclick=showHint;
$('lens').onclick=()=>{lens=!lens;chime('magnifier');renderStatus();updateMagnifiers(pointer.x,pointer.y);notify(lens?'Move over either picture to magnify the same spot in both.':'Magnifier off.');};
$('pause').onclick=()=>{if(complete()){showCompleted();return;}setPaused(!paused);};
$('sound').onclick=()=>{sound=!sound;chime('hint');renderStatus();persist();};
$('help').onclick=showHelp;$('restart').onclick=requestRestart;
$('mode').onclick=()=>{relaxed=!relaxed;if(!relaxed&&current().remaining<=0){current().remaining=definition().time;}renderStatus();persist();notify(relaxed?'No clock. Just you and the little details.':'Timed mode. Wrong guesses cost 8 seconds.');};
$('close-modal').onclick=closeModal;
$('modal').addEventListener('cancel',e=>{e.preventDefault();closeModal();});
installKeyboardControls({lensActive:()=>lens,dialogOpen:()=>$('modal').open,pictureFocused:()=>panels.includes(document.activeElement),hint:showHint,toggleLens:()=>$('lens').click(),relax:()=>$('mode').click(),pause:()=>setPaused(true),help:showHelp,chapter:selectChapter,mark:()=>guessDifference(pointer.x,pointer.y),move:(key,step)=>{keyboardPointer=true;pointer.x=Math.max(12,Math.min(888,pointer.x+(key==='ArrowLeft'?-step:key==='ArrowRight'?step:0)));pointer.y=Math.max(12,Math.min(668,pointer.y+(key==='ArrowUp'?-step:key==='ArrowDown'?step:0)));renderMarks();updateMagnifiers(pointer.x,pointer.y);}});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&canPlay())setPaused(true);});
addEventListener('pagehide',persist);
function advanceClock(now){
 const elapsed=Math.min(1,(now-lastFrame)/1000);lastFrame=now;frames++;
 if(now-frameStart>=1000){fps=frames*1000/(now-frameStart);frames=0;frameStart=now;}
 if(canPlay()&&!relaxed){const before=Math.ceil(current().remaining);current().remaining=Math.max(0,current().remaining-elapsed);if(before!==Math.ceil(current().remaining))renderStatus();if(current().remaining<=0)showTimeout();}
 if(hintFeature!==null&&now>=hintUntil){hintFeature=null;renderMarks();}
 if(now-lastSave>3000){persist();lastSave=now;}
 requestAnimationFrame(advanceClock);
}
// Read-only state makes reproducible input-driven browser QA possible.
Object.defineProperty(window,'littleElsewhere',{get:()=>({chapter,found:[...current().found],remaining:current().remaining,hints:current().hints,points:current().points,mistakes:current().mistakes,paused,relaxed,complete:complete(),fps,audio:audioDiagnostics(),pointer:{...pointer},chapters:states.map(s=>({found:[...s.found],completed:s.completed,points:s.points}))})});
renderChapter();document.querySelector('footer>span').textContent=`${totalDifferences} hidden changes · ${chapters.length} illustrated worlds`;if(current().remaining<=0&&!relaxed&&!complete())showTimeout();requestAnimationFrame(advanceClock);
