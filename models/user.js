const db = require('../db');
const crypto = require('crypto');

const hashValue = (value) => {
  const shaValue = '{SHA256-CRYPT}$5$' + crypto.createHash('sha256').update(value).digest('base64');
  return shaValue;
};

exports.create = (newUser, done) => {
  const values = [
    newUser.domain,
    newUser.user,
    hashValue(newUser.password)];
  db.get().query('INSERT INTO virtual_users (domain_id, email, password) VALUES (?, ?, ?);', values, (err, rows) => {
    if (err) done(err);
    done(null, rows);
  });
};

exports.getAll = (done) => {
  db.get().query('SELECT u.id, d.name, u.email FROM virtual_users u, virtual_domains d WHERE d.id = u.domain_id ORDER BY u.id ASC;', (err, rows) => {
    if (err) {
      return done(err);
    }
    return done(null, rows);
  });
};
