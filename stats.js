const user = JSON.parse(localStorage.getItem('jernih_user')||'{}');
const userDisplay = document.getElementById('user-display'); if(user && user.name) userDisplay.textContent = `${user.name} (${user.age} tahun)`;
const stats = JSON.parse(localStorage.getItem('jernih_stats')||'[]');
const tbody = document.getElementById('stats-body');
if(stats.length===0){ document.getElementById('stats-body').innerHTML = '<tr><td colspan="3" style="text-align:center;color:#94a3b8">Belum ada data</td></tr>' }
else { const b = document.getElementById('stats-body'); stats.forEach(s=>{ const tr = document.createElement('tr'); tr.innerHTML = `<td>${s.date}</td><td>${s.score}</td><td>${s.duration}</td>`; b.appendChild(tr); }); }
document.getElementById('backBtn').addEventListener('click',()=>window.location.href='index.html');