// crossword.js - 30 words across, 15 cols x 30 rows grid
const user = JSON.parse(localStorage.getItem('jernih_user')||'{}');
const userDisplay = document.getElementById('user-display'); if(user && user.name) userDisplay.textContent = `Nama: ${user.name} | Umur: ${user.age}`;
const wordList = [
  {word:'STRES',clue:'Keadaan tegang emosional akibat tekanan',explain:`Stres dapat dikurangi dengan jeda ringan dan relaksasi.`},
  {word:'TENANG',clue:'Kondisi pikiran yang damai',explain:`Menjaga ketenangan membantu fokus.`},
  {word:'MEDIA',clue:'Sarana komunikasi digital',explain:`Media sosial berguna bila digunakan secukupnya.`},
  {word:'BIJAK',clue:'Bersikap dewasa dan penuh pertimbangan',explain:`Bijak berarti menimbang konsekuensi sebelum bertindak.`},
  {word:'MIMPI',clue:'Pengalaman saat tidur',explain:`Mimpi membantu otak memproses emosi.`},
  {word:'SAHABAT',clue:'Teman dekat yang mendukung',explain:`Sahabat membantu mengurangi beban psikologis.`},
  {word:'SEHAT',clue:'Kondisi fisik dan mental baik',explain:`Keseimbangan fisik dan mental saling memengaruhi.`},
  {word:'BATAS',clue:'Pembatasan penggunaan layar',explain:`Batas waktu layar penting untuk kesehatan mental.`},
  {word:'SENYUM',clue:'Ekspresi wajah bahagia',explain:`Senyum dapat meningkatkan suasana hati.`},
  {word:'JERNIH',clue:'Nama aplikasi ini',explain:`Jernih = pikiran bersih dan fokus.`},
  {word:'TIDUR',clue:'Kegiatan istirahat alami tubuh',explain:`Tidur berkualitas penting untuk kesehatan mental.`},
  {word:'NAPAS',clue:'Proses respirasi; teknik relaksasi',explain:`Mengatur napas membantu menenangkan syaraf.`},
  {word:'OLAHRAGA',clue:'Aktivitas fisik untuk kesehatan',explain:`Olahraga baik untuk tubuh dan pikiran.`},
  {word:'KALSIUM',clue:'Mineral penting untuk tulang',explain:`Kalsium mendukung kesehatan tubuh.`},
  {word:'VITAMIN',clue:'Nutrisi mikro untuk tubuh',explain:`Vitamin membantu fungsi fisik & mental.`},
  {word:'SOSIAL',clue:'Bersifat berhubungan pada masyarakat',explain:`Interaksi sosial sehat mendukung kesejahteraan.`},
  {word:'PRIVASI',clue:'Hak atas ruang pribadi online',explain:`Menjaga privasi penting demi keamanan mental.`},
  {word:'EMPATI',clue:'Kemampuan merasakan orang lain',explain:`Empati memperkuat hubungan sosial.`},
  {word:'KOMUNITAS',clue:'Sekelompok orang yang berbagi tujuan',explain:`Komunitas mendukung rasa keterikatan.`},
  {word:'REFLEKSI',clue:'Proses merenung terhadap tindakan',explain:`Refleksi membantu peningkatan diri.`},
  {word:'EDUKASI',clue:'Proses pembelajaran',explain:`Edukasi meningkatkan kesadaran.`},
  {word:'POSITIF',clue:'Bersifat optimis dan konstruktif',explain:`Sikap positif meningkatkan ketahanan mental.`},
  {word:'SEIMBANG',clue:'Kondisi proporsional dan stabil',explain:`Seimbang antara kerja dan istirahat penting.`},
  {word:'HIBURAN',clue:'Aktivitas untuk melepas penat',explain:`Hiburan yang terukur membantu relaksasi.`},
  {word:'BERSYUKUR',clue:'Rasa terima kasih atas yang dimiliki',explain:`Rasa syukur meningkatkan kesejahteraan.`},
  {word:'KONSISTEN',clue:'Tetap menerapkan kebiasaan baik',explain:`Konsistensi membantu mencapai tujuan.`},
  {word:'MINDFUL',clue:'Kesadaran penuh pada saat ini',explain:`Mindfulness membantu menenangkan pikiran.`},
  {word:'SOSMED',clue:'Singkatan media sosial',explain:`Istilah umum untuk platform digital.`},
  {word:'NETWORK',clue:'Jaringan hubungan sosial',explain:`Network membantu mendapat dukungan.`},
  {word:'ORGANIK',clue:'Konten alami/tidak dimanipulasi',explain:`Konsumsi konten sehat meningkatkan kesejahteraan.`},
];
const COLS=15, ROWS=30;
const grid = document.getElementById('crossword-grid'); const acrossList = document.getElementById('across-list'); const submitBtn = document.getElementById('submitBtn'); const resultSection = document.getElementById('result-section'); const scoreText = document.getElementById('score-text'); const feedbackDiv = document.getElementById('feedback'); const retryBtn = document.getElementById('retryBtn'); const statsBtn = document.getElementById('statsBtn'); const backBtn = document.getElementById('backBtn'); const timerEl = document.getElementById('timer');
const matrix = Array.from({length:ROWS},()=>Array(COLS).fill(null));
// place each word in its own row starting at column 0
wordList.forEach((entry,idx)=>{ const row=idx; const w=entry.word.toUpperCase(); for(let c=0;c<Math.min(w.length,COLS);c++){ matrix[row][c]=''; } });
grid.style.gridTemplateColumns = `repeat(${COLS},36px)`; grid.innerHTML='';
for(let r=0;r<ROWS;r++){ for(let c=0;c<COLS;c++){ const cell=document.createElement('div'); cell.classList.add('cell'); if(matrix[r][c]===null){ cell.classList.add('blocked'); } else { const input=document.createElement('input'); input.maxLength=1; input.dataset.x=c; input.dataset.y=r; input.autocomplete='off'; input.addEventListener('input',e=>{ e.target.value=e.target.value.toUpperCase(); const nx=parseInt(e.target.dataset.x)+1; const ny=parseInt(e.target.dataset.y); const next=document.querySelector(`input[data-x="${'${nx}'}"][data-y="${'${ny}'}"]`); if(next) next.focus(); }); input.addEventListener('keydown',e=>{ const x=parseInt(e.target.dataset.x); const y=parseInt(e.target.dataset.y); if(e.key==='ArrowRight'){ const n=document.querySelector(`input[data-x="${x+1}"][data-y="${y}"]`); if(n) n.focus(); e.preventDefault(); } else if(e.key==='ArrowLeft'){ const n=document.querySelector(`input[data-x="${x-1}"][data-y="${y}"]`); if(n) n.focus(); e.preventDefault(); } else if(e.key==='ArrowDown'){ const n=document.querySelector(`input[data-x="${x}"][data-y="${y+1}"]`); if(n) n.focus(); e.preventDefault(); } else if(e.key==='ArrowUp'){ const n=document.querySelector(`input[data-x="${x}"][data-y="${y-1}"]`); if(n) n.focus(); e.preventDefault(); } }); cell.appendChild(input); } grid.appendChild(cell); } }
// clues list
acrossList.innerHTML=''; wordList.forEach((w,i)=>{ const li=document.createElement('li'); li.textContent = `${i+1}. ${w.clue} (${w.word.length} huruf)`; acrossList.appendChild(li); });
// timer: 1 minute per word
let timeLeft = wordList.length * 60; let timerId=null; function updateTimer(){ const m=Math.floor(timeLeft/60); const s=timeLeft%60; if(timerEl) timerEl.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`; } function startTimer(){ updateTimer(); timerId=setInterval(()=>{ timeLeft--; updateTimer(); if(timeLeft<=0){ clearInterval(timerId); checkAnswers(); } },1000); }
function checkAnswers(){ if(timerId) clearInterval(timerId); let correct=0; feedbackDiv.innerHTML=''; wordList.forEach((entry,idx)=>{ const row=idx; const w=entry.word.toUpperCase(); let ua=''; for(let c=0;c<Math.min(w.length,COLS);c++){ const inp=document.querySelector(`input[data-x='${c}'][data-y='${row}']`); ua += (inp?.value||'').toUpperCase(); } const isCorrect = ua === w; if(isCorrect) correct++; for(let c=0;c<Math.min(w.length,COLS);c++){ const inp=document.querySelector(`input[data-x='${c}'][data-y='${row}']`); if(!inp) continue; if(isCorrect) inp.parentElement.classList.add('correct'); else inp.parentElement.classList.add('incorrect'); } const p=document.createElement('p'); p.innerHTML = `<strong>${idx+1}. ${w}</strong> — ${isCorrect? 'Benar ✅':'Salah ❌'}<br><em>${entry.explain}</em>`; feedbackDiv.appendChild(p); }); const total=wordList.length; const score = Math.round((correct/total)*100); if(scoreText) scoreText.textContent = `Skor kamu: ${score}% (${correct} dari ${total} benar)`; if(resultSection) resultSection.classList.remove('hidden'); saveStat(score,total); // show download and stats btn setTimeout(()=>{ const dbtn = document.getElementById('downloadBtn'); if(dbtn){ dbtn.classList.remove('hidden'); dbtn.onclick = ()=>downloadResult(score); } },100); }
function saveStat(score,total){ const dateNow = new Date().toLocaleString('id-ID',{dateStyle:'medium',timeStyle:'short'}); const stats = JSON.parse(localStorage.getItem('jernih_stats')||'[]'); stats.push({date:dateNow,score:score,duration:total}); localStorage.setItem('jernih_stats',JSON.stringify(stats)); }
function downloadResult(score){ const dateNow = new Date().toLocaleString('id-ID',{dateStyle:'medium',timeStyle:'short'}); const userOb = JSON.parse(localStorage.getItem('jernih_user')||'{}'); const content = `Hasil JERNIH\n\nNama: ${userOb.name||'Tamu'}\nUmur: ${userOb.age||'-'}\nSkor: ${score}%\nTanggal: ${dateNow}\nDurasi: ${wordList.length} menit\n\nTerima kasih telah berlatih. Jaga keseimbangan layar dan istirahat.`; const blob=new Blob([content],{type:'text/plain'}); const link=document.createElement('a'); link.href=URL.createObjectURL(blob); link.download=`Hasil_Jernih_${(userOb.name||'user').replace(/\s+/g,'_')}.txt`; link.click(); }
if(submitBtn) submitBtn.addEventListener('click', checkAnswers); if(retryBtn) retryBtn.addEventListener('click',()=>location.reload()); if(statsBtn) statsBtn.addEventListener('click',()=>window.location.href='stats.html'); if(backBtn) backBtn.addEventListener('click',()=>window.location.href='index.html'); startTimer(); setTimeout(()=>{ const f=document.querySelector("input[data-x='0'][data-y='0']"); if(f) f.focus(); },300);