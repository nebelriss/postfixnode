var db = require('../db');

exports.getAll = (done) => {
  db.get().query('SELECT u.id, d.name, u.email FROM virtual_users u, virtual_domains d WHERE d.id = u.domain_id ORDER BY u.id ASC;', (err, rows) => {
    if (err) {
      return done(err);
    };
    done(null, rows);
  });
};
