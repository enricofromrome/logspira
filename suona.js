/*
Copyright (c) 2021 Enrico de Bernart

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
totemp=0

onmessage = function(e) {
  //predisposizione lunghezza musica e header
  totemp=0
  dafa=JSON.parse(e.data)
  
  for (var i=1; i<dafa.tempo.length; i++) {
  questo=dafa.tempo[i][1]*1+dafa.tempo[i][2]*1
  if (totemp<questo){totemp=questo}
  }
  lung=Math.ceil(((48000*60)/dafa.bpm)*totemp)
  
  music = new Uint16Array(lung)
  for (var i=0;i<lung;i++){music[i]=32768}
  //music = new Uint16Array(lung)
  peppe="RIFF"+nu((lung*2)+36,4)+"WAVEfmt "+nu(16,4)+nu(1,2)+nu(1,2)+nu(48000,4)+nu(96000,4)+nu(2,2)+nu(16,2)+"data"+nu((lung*2),4)
  // comincio a leggere i suoni
for (var note=1;note<dafa.tempo.length;note++){
spiaztemp=Math.round(dafa.tempo[note][1]*((48000*60)/dafa.bpm))
durata=Math.round(dafa.tempo[note][2]*((48000*60)/dafa.bpm))
forza=dafa.tempo[note][3]/2
frq=dafa.tempo[note][4]
frqf=dafa.tempo[note][5]
strumento=dafa.tempo[note][6]
strufreq=dafa.instr[strumento]
totfor=0
for (var ff=1;ff<strufreq.length;ff++){totfor+=(strufreq[ff][5]*1)}
for (var ff=1;ff<strufreq.length;ff++){
maxfor=forza*(strufreq[ff][5]/totfor)
seno=dafa.timbri[strufreq[ff][3]][2]
volu=dafa.battuta[strufreq[ff][4]][2]
frequ=frq*strufreq[ff][1]+(strufreq[ff][2]*1)
frequf=frqf*strufreq[ff][1]+(strufreq[ff][2]*1)
periodo=48000/frequ
periodof=48000/frequf
  for (var i=0; i<durata; i++) {
  perc=i/durata
  peri=(periodo*(1-perc))+(periodof*perc)
  fase=i % peri
 onda=seno[Math.round(((seno.length-1)*fase)/peri)] 
inten=Math.round(maxfor*(volu[Math.round((volu.length-1)*perc)])*onda)+music[spiaztemp+i]
//if (inten>65535){console.log(inten);inten=65535}
//if (inten<0){console.log(inten);inten=0}
music[spiaztemp+i]=inten
  }
}
}
  // ho finito e restituisco la musica
  for (var i=0;i<lung;i++){
  peppe+=String.fromCharCode((music[i] & 65280)/256)+String.fromCharCode(music[i] & 255)
  }
  postMessage(btoa(peppe))  
}

//___________________nu___________________________________
function nu(quanto,lungo){
k="";nume=quanto
for (var i=0;i<lungo;i+=1){
k+=String.fromCharCode(nume & 255)
nums=nume
nume=Math.floor(nums/256)
}
return k
}
