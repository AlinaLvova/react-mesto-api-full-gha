require('dotenv').config();
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('./middlewares/cors');
const errors = require('./middlewares/errors');
const { DB_ADDRESS } = require('./utils/config');

// подключаемся к серверу mongo
mongoose
  .connect(DB_ADDRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Успешное подключение к базе данных');
  })
  .catch((error) => {
    console.log('Ошибка при подключении к базе данных:', error.name);
  });

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

// теперь клиент имеет доступ только к публичным файлам
app.use(express.static(path.join(__dirname, 'public')));

// middleware для обработки данных в формате JSON
app.use(express.json());

app.use(cookieParser());

app.use(cors);

// удалить после прохождения ревью
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(require('./routes/index'));

app.use(errors); // централизованный обработчик ошибок

app.listen(PORT, () => {
});
