
const chat = document.querySelector('#chat');
const q = document.querySelector('#q');
const form = document.querySelector('#form');

let mode = 'offline';

function add(message, type) {
  const welcome = document.querySelector('.welcome');
  if (welcome) welcome.remove();

  const div = document.createElement('div');
  div.className = 'msg ' + type;
  div.textContent = message;

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function localAnswer(s) {
  s = s.toLowerCase().trim();

  if (/^(hi|hello|hey|namaste|namaskar|नमस्ते|हेलो|हाय)/.test(s))
    return 'नमस्ते! 😊 मैं Alex AI हूँ। बताइए, क्या मदद करूँ?';

  if (s.includes('तुम्हारा नाम') || s.includes('your name') ||
      s.includes('naam kya') || s.includes('नाम क्या'))
    return 'मेरा नाम Alex AI है! 🤖';

  if (s.includes('कौन हो') || s.includes('who are you'))
    return 'मैं Alex AI हूँ, आपका Offline Assistant! 🤖';

  if (s.includes('मजाक') || s.includes('joke') ||
      s.includes('majak'))
    return '😄 टीचर: बिजली कहाँ से आती है? बच्चा: मामा के घर से!';

  if (s.includes('क्या कर सकते') || s.includes('ky kar') ||
      s.includes('features') || s.includes('मदद') ||
      s.includes('help') || s.includes('offline'))
    return 'मैं Offline में ये काम कर सकती हूँ: 😊\n\n1. सामान्य बातचीत\n2. मजाक सुनाना\n3. अपना परिचय देना\n4. सामान्य सवालों के जवाब\n5. धन्यवाद और अभिवादन का जवाब';

  if (s.includes('धन्यवाद') || s.includes('thank'))
    return 'आपका स्वागत है! 😊';

  if (s.includes('कैसे हो') || s.includes('how are you'))
    return 'मैं बढ़िया हूँ! 😊 आप कैसे हैं?';

  if (s.includes('भारत') || s.includes('india'))
    return 'भारत की राजधानी नई दिल्ली है। 🇮🇳';

  if (s.includes('समय') || s.includes('time'))
    return 'अपने मोबाइल की घड़ी में सही समय देखें।';

  if (s.includes('bye') || s.includes('अलविदा'))
    return 'फिर मिलेंगे! 😊';

  return 'अच्छा सवाल है! 😊 अभी मेरे Offline ज्ञान में इसका जवाब उपलब्ध नहीं है।';
}

async function onlineAnswer(message) {
  const endpoint = 'https://alex-ai-dys6.onrender.com/api/chat';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Online सेवा अभी उपलब्ध नहीं है।');
  }

  return data.reply || 'जवाब नहीं मिला।';
}

form.addEventListener('submit', async function(e) {
  e.preventDefault();

  const message = q.value.trim();
  if (!message) return;

  q.value = '';
  add(message, 'user');

  const reply = document.createElement('div');
  reply.className = 'msg bot';
  reply.textContent = 'सोच रही हूँ...';

  chat.appendChild(reply);
  chat.scrollTop = chat.scrollHeight;

  try {
    reply.textContent = mode === 'offline'
      ? localAnswer(message)
      : await onlineAnswer(message);
  } catch (error) {
    reply.textContent = '⚠️ ' + error.message;
  }

  chat.scrollTop = chat.scrollHeight;
});

function setMode(newMode) {
  mode = newMode;

  document.querySelector('#off').classList.toggle(
    'active', mode === 'offline'
  );

  document.querySelector('#on').classList.toggle(
    'active', mode === 'online'
  );

  document.querySelector('#status').textContent =
    mode === 'offline' ? 'Offline' : 'Online';
}

document.querySelector('#off').addEventListener('click', () => {
  setMode('offline');
});

document.querySelector('#on').addEventListener('click', () => {
  setMode('online');
});

document.querySelector('#clear').addEventListener('click', () => {
  chat.innerHTML = `
    <div class="welcome">
      <b>नमस्ते! मैं Alex AI हूँ 👋</b>
      हिंदी या English में सवाल पूछें।
    </div>
  `;
});

setMode('offline');
