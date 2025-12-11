# chatbot-widget<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>Chatbot Widget</title>
<style>
#mybot {
  position: fixed; bottom: 20px; right: 20px;
  width: 330px; max-height: 480px;
  box-shadow: 0 6px 20px rgba(0,0,0,.2);
  border-radius: 12px; overflow: hidden;
  font-family: Arial, sans-serif;
}
#mybot .header { background:#0b5; padding:10px; color:#fff; }
#mybot .messages { height:320px; overflow:auto; padding:10px; background:#fff; }
#mybot .input { display:flex; padding:8px; background:#f6f6f6; }
#mybot input { flex:1; padding:8px; border-radius:6px; border:1px solid #ddd; }
#mybot button { margin-left:8px; padding:8px 12px; border:none;
  border-radius:6px; background:#0b5; color:#fff; }
.message { margin:6px 0; }
.bot { color:#111; background:#eef; padding:8px; border-radius:8px; display:inline-block; }
.user { text-align:right; color:#fff; background:#0b5; padding:8px; border-radius:8px; display:inline-block; float:right; }
</style>
</head>
<body>

<div id="mybot">
  <div class="header">Chatbot</div>
  <div class="messages" id="messages"></div>
  <div class="input">
    <input id="text" placeholder="Schreibe..." />
    <button id="send">Senden</button>
  </div>
</div>

<script>
const messagesEl = document.getElementById('messages');
const input = document.getElementById('text');
const send = document.getElementById('send');

function addMessage(text, cls='bot'){
  const div = document.createElement('div');
  div.className = 'message ' + cls;
  div.innerHTML = '<div class="'+cls+'">'+text+'</div>';
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

async function sendMessage(){
  const text = input.value.trim();
  if(!text) return;
  addMessage(text, 'user');
  input.value = '';

  try {
    const res = await fetch('https://DEINE-NETLIFY-URL.netlify.app/.netlify/functions/reply', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({message:text, site:'testkunde'})
    });
    const j = await res.json();
    addMessage(j.reply || 'Fehler.');
  } catch(e){
    addMessage('Serverfehler. Fallback genutzt.');
    addMessage(fallbackReply(text));
  }
}

function fallbackReply(text){
  text = text.toLowerCase();
  if(text.includes('preis')) return 'Unsere Preise beginnen ab 29€.';
  if(text.includes('öffnungszeit')) return 'Wir haben Mo–Fr von 9–18 Uhr geöffnet.';
  if(text.includes('termin')) return 'Gerne, an welchem Tag passt es dir?';
  return 'Vielen Dank! Wir melden uns asap.';
}

send.addEventListener('click', sendMessage);
input.addEventListener('keypress', e=>{ if(e.key==='Enter') sendMessage(); });

addMessage('Hallo 👋 Wie kann ich dir helfen?');
</script>

</body>
</html>
