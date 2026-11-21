// A small original pentatonic chime, synthesized locally after a user gesture.
let context;
export function playChime(kind='find',step=0){
 try{
  context??=new (window.AudioContext||window.webkitAudioContext)();
  if(context.state==='suspended')context.resume();
  const notes=kind==='find'?[523.25,659.25,783.99]:kind==='win'?[523.25,659.25,783.99,1046.5]:kind==='hint'?[392,523.25]:[220,196];
  notes.forEach((frequency,i)=>{
   const t=context.currentTime+i*.075,osc=context.createOscillator(),gain=context.createGain();
   osc.type='sine';osc.frequency.value=frequency*Math.pow(2,(step%3)/12);
   gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(.065,t+.015);gain.gain.exponentialRampToValueAtTime(.001,t+.45);
   osc.connect(gain);gain.connect(context.destination);osc.start(t);osc.stop(t+.48);
  });
 }catch{/* Audio is optional when a browser or device disables it. */}
}
