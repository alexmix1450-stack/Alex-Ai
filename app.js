
const chat = document.querySelector('#chat');
const q = document.querySelector('#q');
let mode = 'offline';

function add(t, c) {
  let w = document.querySelector('.welcome');
  if (w) w.remove();

  let d = document.createElement('div');
  d.className = 'msg ' + c;
  d.textContent = t;
  chat.appendChild(d);
  chat.scrollTop = chat.scrollHeight;
}

function localAnswer(s) {
  s = s.toLowerCase().trim();

  if (/^(hi|hello|hey|नमस्ते|हेलो|हाय)/.test(s))
    return 'नमस्ते! 😊 मैं Alex AI हूँ। बताइए, आज मैं आपकी क्या मदद करूँ?';

  if (s.includes('तुम्हारा नाम') || s.includes('your name') || s.includes('नाम क्या'))
    return 'मेरा नाम Alex AI है! 🤖 आपका अपना AI Assistant।';

  if (s.includes('कौन हो') || s.includes('who are you'))
    return 'मैं Alex AI हूँ। एक स्मार्ट Offline Assistant हूँ।';

  if (s.includes('क्या कर सकते') || s.includes('features') || s.includes('help') || s.includes('मदद'))
    return 'मैं सामान्य सवालों के जवाब, बातचीत और आइडिया देने में मदद कर सकता हूँ।';

  if (s.includes('धन्यवाद') || s.includes('thank'))
    return 'आपका स्वागत है! 😊';

  if (s.includes('कैसे हो') || s.includes('how are you'))
    return 'मैं बढ़िया काम कर रहा हूँ! 😊 आप कैसे हैं?';

  if (s.includes('समय') || s.includes('time'))
    return 'सही स्थानीय समय देखने के लिए अपने मोबाइल की घड़ी देखें।';

  if (s.includes('मजाक') || s.includes('joke'))
    return '😄 टीचर: बिजली कहाँ से आती है? बच्चा: मामा के घर से!';

  if (s.includes('भारत') || s.includes('india'))
    return 'भारत की राजधानी नई दिल्ली है। 🇮🇳';

  if (s.includes('creator') || s.includes('किसने बनाया'))
    return 'मुझे Alex AI प्रोजेक्ट के रूप में बनाया गया है। 🤖';

  if (s.includes('bye') || s.includes('अलविदा'))
    return 'फिर मिलेंगे! 😊';

  return 'अच्छा सवाल है! 😊 अभी मैं Free Offline Mode में हूँ, इसलिए इसका जवाब मेरे सीमित ज्ञान में उपलब्ध नहीं है।';
}

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
}

document.querySelector('#form').addEventListener('submit', async e => {
  e.preventDefault();

  let s = q.value.trim();
  if (!s) return;

  q.value = '';
  add(s, 'user');

  let d = document.createElement('div');
  d.className = 'msg bot';
  d.textContent = 'सोच रहा हूँ…';
  chat.appendChild(d);

  try {
    d.textContent = mode === 'offline'
      ? localAnswer(s)
      : await onlineAnswer(s);
  } catch (x) {
    d.textContent = x.message;
  }
});

function setMode(m) {
  mode = m;
  document.querySelector('#off').classList.toggle('active', m === 'offline');
  document.querySelector('#on').classList.toggle('active', m === 'online');
  document.querySelector('#status').textContent =
    m === 'offline' ? 'Offline' : 'Online';
}

document.querySelector('#off').onclick = () => setMode('offline');
document.querySelector('#on').onclick = () => setMode('online');

document.querySelector('#clear').onclick = () => {
  chat.innerHTML = '<div class="welcome"><b>नमस्ते! मैं Alex AI हूँ 👋</b>हिंदी या English में सवाल पूछें।</div>';
};

if ('serviceWorker' in navigator) {
  addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
