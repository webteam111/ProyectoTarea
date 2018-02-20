var crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
  uri : 'mongodb:///abonap',
  secret : crypto,
  db: 'abonap'
}