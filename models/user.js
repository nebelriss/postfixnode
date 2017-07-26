var db = require('../db');
var crypto = require('crypto');

var hashValue = (value) => {
  return "{SHA256-CRYPT}$5$" + crypto.createHash('sha256').update(value).digest('base64');
}

exports.create = (newUser, done) => {
  var values = [
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
    };
    done(null, rows);
  });
};
