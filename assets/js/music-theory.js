(function(){
  const NAMES=['C','C♯','D','E♭','E','F','F♯','G','A♭','A','B♭','B'];
  const TRAINING_TYPES=[
    {id:'major',label:'大三和弦',suffix:'',intervals:[0,4,7],formula:['1','3','5'],atlasIndex:0,focus:'明亮稳定，关键是大三度。'},
    {id:'minor',label:'小三和弦',suffix:'m',intervals:[0,3,7],formula:['1','♭3','5'],atlasIndex:1,focus:'较暗或内敛，关键是小三度。'},
    {id:'dominant7',label:'属七和弦',suffix:'7',intervals:[0,4,7,10],formula:['1','3','5','♭7'],atlasIndex:8,focus:'大三和弦上加入小七度，带有明显解决倾向。'},
    {id:'major7',label:'大七和弦',suffix:'maj7',intervals:[0,4,7,11],formula:['1','3','5','7'],atlasIndex:9,focus:'大三和弦上加入大七度，色彩柔和而悬浮。'},
    {id:'minor7',label:'小七和弦',suffix:'m7',intervals:[0,3,7,10],formula:['1','♭3','5','♭7'],atlasIndex:10,focus:'小三和弦上加入小七度，听感松弛而温暖。'}
  ];
  const pc=n=>((n%12)+12)%12;
  const name=n=>NAMES[pc(n)];
  function midiForPc(p,min){let midi=min;while(pc(midi)!==pc(p))midi++;return midi}
  function ascendingNotes(pcs,start){let cursor=start-1;return pcs.map(p=>{cursor++;while(pc(cursor)!==pc(p))cursor++;return cursor})}
  function guitarVoicing(root,type){const chordPcs=type.intervals.map(i=>pc(root+i));const voices=[root,...chordPcs.filter(p=>p!==root)];while(voices.length<6)voices.push(chordPcs[(voices.length-1)%chordPcs.length]);return ascendingNotes(voices.slice(0,6),midiForPc(root,40))}
  window.ChordMasterTheory={NAMES,TRAINING_TYPES,pc,name,midiForPc,ascendingNotes,guitarVoicing};
})();
