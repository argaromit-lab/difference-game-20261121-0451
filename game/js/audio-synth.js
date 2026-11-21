// Original procedural audio effects: bell, soft error, hint sparkle and completion fanfare.
let context,enabled=false;const stats={find:0,miss:0,hint:0,magnifier:0,win:0};
export function setAudioEnabled(value){enabled=Boolean(value);if(!enabled&&context?.state==='running')context.suspend().catch(()=>{});}
export function audioDiagnostics(){return {...stats,enabled,state:context?.state||'unopened'};}
export function playSoundEffect(kind='find',streak=0){
 if(!enabled)return;
 try{context??=new (window.AudioContext||window.webkitAudioContext)();if(context.state==='suspended')context.resume().catch(()=>{});
  const phrases={find:[659.25,987.77],miss:[196,164.81],hint:[392,523.25,659.25],magnifier:[440,554.37],win:[523.25,659.25,783.99,1046.5,1318.51]};const phrase=phrases[kind]||phrases.find;stats[kind]=(stats[kind]||0)+1;
  phrase.forEach((frequency,i)=>{const t=context.currentTime+i*(kind==='win'?.11:.065),osc=context.createOscillator(),gain=context.createGain();osc.type=kind==='miss'?'triangle':'sine';osc.frequency.setValueAtTime(frequency*(kind==='find'?2**(Math.min(4,streak)/24):1),t);gain.gain.setValueAtTime(.0001,t);gain.gain.exponentialRampToValueAtTime(kind==='miss'?.035:.055,t+.012);gain.gain.exponentialRampToValueAtTime(.0001,t+(kind==='win'?.65:.3));osc.connect(gain);gain.connect(context.destination);osc.start(t);osc.stop(t+.72);});
 }catch{/* Audio availability never blocks play. */}
}
