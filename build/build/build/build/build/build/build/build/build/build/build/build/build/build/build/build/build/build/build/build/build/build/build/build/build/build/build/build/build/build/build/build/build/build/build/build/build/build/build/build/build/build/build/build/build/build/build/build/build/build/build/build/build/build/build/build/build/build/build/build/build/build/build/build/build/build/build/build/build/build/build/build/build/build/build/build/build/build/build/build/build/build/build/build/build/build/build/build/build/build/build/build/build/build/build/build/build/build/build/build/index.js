
const { Telegraf, Markup } = require('telegraf');
const express = require('express');

const bot = new Telegraf('8141283977:AAF-HavrT0BCxHph8vQ8HcH6VEmjlFcKIDQ'); // Ваш токен от BotFather

const products = [
  { name: 'Футболка', price: '500 руб.' },
  { name: 'Куртка', price: '3000 руб.' },
  { name: 'Шорты', price: '1000 руб.' },
];

// Команда /start с кнопкой WebApp с новым URL от ngrok
bot.start((ctx) => {
  ctx.reply(
    'Добро пожаловать в каталог товаров!',
    Markup.inlineKeyboard([
      [Markup.button.webApp('Открыть каталог', 'https://969a-188-187-116-24.ngrok-free.app')]
    ])
  );
});

// Обработка выбора товара
products.forEach((product, index) => {
  bot.action(`product_{index}`, (ctx) => {
    ctx.answerCbQuery();
    ctx.reply(`Вы выбрали: {product.name} за {product.price}`);
  });
});

// Запуск бота
bot.launch();

// Запуск express сервера для поддержки Webhook (если нужно)
const app = express();
app.get('/', (req, res) => res.send('Telegram Web App is running'));
app.listen(3000, () => console.log('Server running on port 3000'));
