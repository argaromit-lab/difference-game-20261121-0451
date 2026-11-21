// Keyboard vocabulary shared by the HUD and hunt controller.
export const keyboardActions={hint:'H',magnifier:'M',relaxed:'R',pause:'Space',mark:'Enter'};
export function movementStep(fine=false){return fine?7:25;}
export function installKeyboardControls(actions){
 const handler=e=>{
  if(e.altKey||e.ctrlKey||e.metaKey||['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName))return;
  const key=e.key.toLowerCase();
  if(key==='escape'&&actions.lensActive()){actions.toggleLens();return;}
  if(actions.dialogOpen())return;
  if(key==='h'){e.preventDefault();actions.hint();return;}
  if(key==='m'||key==='l'){e.preventDefault();actions.toggleLens();return;}
  if(key==='r'){e.preventDefault();actions.relax();return;}
  if(key==='p'){e.preventDefault();actions.pause();return;}
  if(key==='?'){actions.help();return;}
  if(/^[1-6]$/.test(key)){actions.chapter(Number(key)-1);return;}
  const inPicture=actions.pictureFocused();
  if(inPicture&&['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();actions.move(e.key,movementStep(e.shiftKey));return;}
  if(inPicture&&(e.key==='Enter'||e.code==='Space')){e.preventDefault();actions.mark();return;}
  if(e.code==='Space'&&document.activeElement.tagName!=='BUTTON'){e.preventDefault();actions.pause();}
 };
 document.addEventListener('keydown',handler);return()=>document.removeEventListener('keydown',handler);
}
