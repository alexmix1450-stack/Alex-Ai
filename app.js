const chat=document.querySelector('#chat'),q=document.querySelector('#q');let mode='offline';
function add(t,c){let w=document.querySelector('.welcome');if(w)w.remove();let d=document.createElement('div');d.className='msg '+c;d.textContent=t;chat.appendChild(d);chat.scrollTop=chat.scrollHeight}
function localAnswer(s){s=s.toLowerCase();if(/^(hi|hello|hey|नमस्ते|हेलो)/.test(s))return 'नमस्ते! 😊 मैं Alex AI हूँ। आपकी क्या मदद करूँ?';if(s.includes('नाम')||s.includes('name'))return 'मेरा नाम Alex AI है! 🤖';if(s.includes('मदद')||s.includes('help'))return 'ज़रूर! आप सामान्य सवाल पूछ सकते हैं। असली AI जवाब के लिए Online mode को सुरक्षित server से जोड़ना होगा।';return 'मैं अभी Offline Demo हूँ, इसलिए मेरे जवाब सीमित हैं। Online AI के लिए secure backend जोड़ना होगा।'}
async function onlineAnswer(s) {
  const ENDPOINT = 'https://alex-ai-dys6.onrender.com/api/chat';

  const r = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: s })
  });

  if (!r.ok) {
    throw Error('Server error: ' + r.status);
  }

  const d = await r.json();
  return d.reply || 'जवाब नहीं मिला।';
}{const ENDPOINT='https://alex-ai-dys6.onrender.com/api/chat';(!ENDPOINT)throw Error('Online AI अभी कनेक्ट नहीं है। HTTPS backend endpoint सेट करना होगा।');let r=await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:s})});if(!r.ok)throw Error('Server error: '+r.status);let d=await r.json();return d.reply||'जवाब नहीं मिला।'}
document.querySelector('#form').addEventListener('submit',async e=>{e.preventDefault();let s=q.value.trim();if(!s)return;q.value='';add(s,'user');let d=document.createElement('div');d.className='msg bot';d.textContent='सोच रहा हूँ…';chat.appendChild(d);try{d.textContent=mode==='offline'?localAnswer(s):await onlineAnswer(s)}catch(x){d.textContent=x.message}});
function setMode(m){mode=m;document.querySelector('#off').classList.toggle('active',m==='offline');document.querySelector('#on').classList.toggle('active',m==='online');document.querySelector('#status').textContent=m==='offline'?'Offline':'Online'}
document.querySelector('#off').onclick=()=>setMode('offline');document.querySelector('#on').onclick=()=>setMode('online');document.querySelector('#clear').onclick=()=>chat.innerHTML='<div class="welcome"><b>नमस्ते! मैं Alex AI हूँ 👋</b>हिंदी या English में सवाल पूछें।</div>';
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
