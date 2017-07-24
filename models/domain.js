var db = require('../db');

exports.create = (domain, done) => {
  var values = [domain];
  db.get().query('INSERT INTO virtual_domains (name) values(?);', values, (err, result) => {
    if (err) {
      done(err);
    };
    done(null, result.insertId);
  });
};

exports.getAll = (done) => {
  db.get().query('SELECT id, name FROM virtual_domains ORDER BY id ASC;', (err, rows) => {
    if (err) {
      return done(err);
    };
    done(null, rows);
  });
};
