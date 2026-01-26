export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { name, phone, email, message } = JSON.parse(event.body || "{}");

    if (!name || !phone || !email || !message) {
      return { statusCode: 400, body: JSON.stringify({ ok: false, error: "Заполни все поля" }) };
    }

    const text =
      `📝 Заявка с сайта\n` +
      `👤 Имя: ${name}\n` +
      `Почта ${email}\n` +
      `Социальная сеть: ${social}\n` +
      `💬 Сообщение: ${message}`;

    const token = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;

    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text })
    });

    const data = await r.json();
    if (!data.ok) {
      return { statusCode: 500, body: JSON.stringify({ ok: false, error: data.description }) };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: e.message }) };
  }
}