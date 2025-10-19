const form = document.getElementById('login-form');
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const age = parseInt(document.getElementById('age').value);
  const activity = parseFloat(document.getElementById('activity').value || 0);
  if(!name || isNaN(age)) return alert('Isi nama dan umur dengan benar.');
  if(age < 10) return alert('Umur minimal 10 tahun.');
  localStorage.setItem('jernih_user', JSON.stringify({name,age,activity,joinedAt:new Date().toISOString()}));
  window.location.href = 'crossword.html';
});