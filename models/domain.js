var db = require('../db');

exports.getAll = (done) => {
  db.get().query('SELECT id, name FROM virtual_domains ORDER BY id ASC;', (err, rows) => {
    if (err) {
      return done(err);
    };
    done(null, rows);
  });
};
