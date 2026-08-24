/* ================= ИИ-ЧАТ (работает на GitHub Pages через CORS) ================= */
/* Сначала пробует локальный API /api/chat, если недоступен — показывает контакты.
   ВАЖНО: ключ API НЕ хранится в клиентском коде (защита от кражи).
   Для работы ИИ из интернета нужен прокси-сервер (см. coffee_api.py на хостинге). */

function toggleChat() {
  const box = document.getElementById('chatBox');
  box.classList.toggle('open');
  if (box.classList.contains('open')) document.getElementById('chatInput').focus();
}
function addMsg(text, who) {
  const body = document.getElementById('chatBody');
  const div = document.createElement('div');
  div.className = 'msg ' + who;
  div.textContent = text;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
  return div;
}
function quickAsk(text) {
  document.getElementById('chatInput').value = text;
  sendMsg();
}

const CHAT_SYSTEM = "Ты — «Кофейный мастер», ИИ-консультант сервисного центра COFFEE CARE (ремонт кофемашин). Правила: 1) Отвечай коротко и по делу, на русском. 2) При описании неисправности назови вероятную причину и примерную цену (диагностика бесплатная при ремонте, выезд в день обращения). 3) Если клиент хочет вызвать мастера — собери имя и телефон, скажи: «Записал! Мастер перезвонит в течение 15 минут. Или оставьте заявку в форме ниже.» 4) Цены: ремонт от 1500₽, чистка от 1200₽, ТО от 990₽, выезд от 500₽. 5) Не выдумывай модели. Будь дружелюбным, тон мастера-наставника, изредка эмодзи ☕.";

let chatHistory = [{ role: 'system', content: CHAT_SYSTEM }];

function sendMsg() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  addMsg(text, 'user');
  const typing = addMsg('☕ мастер набирает...', 'bot');
  chatHistory.push({ role: 'user', content: text });

  fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text }) })
    .then(r => { if (!r.ok) throw new Error('no local'); return r.json(); })
    .then(d => {
      typing.remove();
      chatHistory.push({ role: 'assistant', content: d.reply });
      addMsg(d.reply, 'bot');
      if (d.order) showOrderSaved();
    })
    .catch(() => {
      typing.textContent = 'ИИ-чат доступен после подключения сервиса. Позвоните: +7 (000) 000-00-00';
    });
}

function showOrderSaved() {
  const btn = document.createElement('div');
  btn.innerHTML = '<button onclick="toast(\'Спасибо! Мастер перезвонит в течение 15 минут\')" style="margin-top:8px;padding:10px 16px;border:none;border-radius:30px;background:linear-gradient(135deg,#a97e3f,#8a6430);color:#fff;font-weight:700;cursor:pointer;font-size:13px">✅ Заявка отправлена!</button>';
  document.getElementById('chatBody').appendChild(btn);
  document.getElementById('chatBody').scrollTop = document.getElementById('chatBody').scrollHeight;
}
function toast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:#4a9e4f;color:#fff;padding:14px 24px;border-radius:12px;z-index:999;font-size:14px;box-shadow:0 10px 30px rgba(0,0,0,.3)';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}
