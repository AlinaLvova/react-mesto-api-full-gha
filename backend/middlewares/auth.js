const jwt = require('jsonwebtoken');

const config = require('../utils/config');
const UnauthorizedError = require('../errors/unauthorizedError');

module.exports = (req, res, next) => {
  // const token = req.cookies.jwtToken;
  const token = req.headers.authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, config.JWT_SECRET_KEY);
  } catch (err) {
    const error = new UnauthorizedError('Необходима авторизация');
    return next(error);
  }

  req.user = payload;
  return next();
};
