const { JWT_SECRET_KEY = 'mAlina-SecretKey' } = process.env;
const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

module.exports = {
  JWT_SECRET_KEY,
  DB_ADDRESS,
};
