(function(){
  const samples=[{m:48,u:'assets/audio/guitar/C3.mp3'},{m:60,u:'assets/audio/guitar/C4.mp3'},{m:72,u:'assets/audio/guitar/C5.mp3'}];
  let active=[],timers=[];
  function stop(){timers.forEach(clearTimeout);timers=[];active.forEach(audio=>{audio.pause();audio.currentTime=0});active=[]}
  function nearest(midi){return samples.reduce((best,sample)=>Math.abs(sample.m-midi)<Math.abs(best.m-midi)?sample:best)}
  function note(midi,delay,volume,onError){const fire=()=>{const sample=nearest(midi),audio=new Audio(sample.u);audio.preload='auto';audio.volume=volume;audio.playbackRate=Math.pow(2,(midi-sample.m)/12);audio.preservesPitch=false;audio.mozPreservesPitch=false;audio.webkitPreservesPitch=false;active.push(audio);audio.onended=()=>{active=active.filter(item=>item!==audio)};audio.play().catch(onError)};if(delay)timers.push(setTimeout(fire,delay));else fire()}
  function play(notes,mode,onError){stop();const gap=mode==='strum'?72:mode==='arp'?360:0;const volume=mode==='chord' ? .34 : mode==='strum' ? .5 : .64;notes.forEach((midi,index)=>note(midi,index*gap,volume,onError))}
  window.ChordMasterAudio={play,stop};
})();
