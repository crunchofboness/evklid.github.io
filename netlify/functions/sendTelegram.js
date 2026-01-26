exports.handler = async (event) => {
  console.log("HTTP method:", event.httpMethod);

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    console.log("Raw body:", event.body);

    const { name, email, social, message } = JSON.parse(event.body || "{}");
    console.log("Parsed payload:", { name, phone, email, hasMessage: !!message });

    const token = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;
    console.log("Env present:", { hasToken: !!token, hasChatId: !!chatId, chatId });

    if (!token || !chatId) {
      return {
        statusCode: 500,
        body: JSON.stringify({ ok: false, error: "Нет BOT_TOKEN или CHAT_ID в переменных окружения Netlify" }),
      };
    }

    const text =
      `📝 Заявка с сайта\n` +
      `👤 Имя: ${name}\n` +
      `Почта: ${email}\n` +
      `Социальная сеть ${social}\n` +
      `💬 Сообщение: ${message}`;

    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    const tg = await r.json();
    console.log("Telegram response:", tg);

    if (!tg.ok) {
      return { statusCode: 500, body: JSON.stringify({ ok: false, error: tg.description }) };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    console.log("ERROR:", e);
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: e.message }) };
  }
};