const { JWT_SECRET_KEY = 'mAlina-SecretKey' } = process.env;
const { DB_ADDRESS = 'mongodb://51.250.20.120:27017/mestodb' } = process.env;

module.exports = {
  JWT_SECRET_KEY,
  DB_ADDRESS,
};
