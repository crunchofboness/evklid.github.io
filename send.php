<?php
// ⚠️ Вставь сюда свои значения
$botToken = '8358323043:AAFPnVyG7JthWsMK5xGDmiyM-batcNyyOsk';
$chatId   = '533846612';

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$social  = trim($_POST['social'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $social === '' || $message === '') {
  http_response_code(400);
  echo 'Заполни все поля';
  exit;
}

$text = "📝 Заявка с сайта\n".
        "👤 Имя: {$name}\n".
        "✉️ Почта: {$email}\n".
        "📨 Telegram: {$social}\n".
        "💬 Сообщение: {$message}";

$url = "https://api.telegram.org/bot{$botToken}/sendMessage";

$payload = [
  'chat_id' => $chatId,
  'text' => $text
];

$options = [
  'http' => [
    'header'  => "Content-Type: application/json\r\n",
    'method'  => 'POST',
    'content' => json_encode($payload),
    'timeout' => 10
  ]
];

$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

if ($result === false) {
  http_response_code(500);
  echo 'Ошибка отправки в Telegram';
  exit;
}

echo 'OK';