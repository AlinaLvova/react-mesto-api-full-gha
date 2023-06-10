const express = require('express');
const { errors } = require('celebrate');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const {
  loginValidator,
  signupValidator,
} = require('../middlewares/validation');
const NotFoundError = require('../errors/notFoundError');
const { requestLogger, errorLogger } = require('../middlewares/logger');

const router = express.Router();

router.use(requestLogger); // логгер запросов

router.post('/signin', loginValidator, login);
router.post('/signup', signupValidator, createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

// Middleware для обработки несуществующих путей
router.use((req, res, next) => next(new NotFoundError('Маршрут не найден')));

router.use(errorLogger); // логгер ошибок

router.use(errors()); // обработчик ошибок celebrate

module.exports = router;
