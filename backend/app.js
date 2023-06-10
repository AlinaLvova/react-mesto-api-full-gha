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
    // useCreateIndex: true,
    // useFindAndModify: false
  });
// .then(() => {
//   process.stdout.write('Успешное подключение к базе данных');
// })
// .catch((error) => {
//   process.stdout.write('Ошибка при подключении к базе данных:', error);
// });

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

// теперь клиент имеет доступ только к публичным файлам
app.use(express.static(path.join(__dirname, 'public')));

// middleware для обработки данных в формате JSON
app.use(express.json());

app.use(cookieParser());

app.use(cors);

app.use(require('./routes/index'));

app.use(errors);

app.listen(PORT, () => {
});
