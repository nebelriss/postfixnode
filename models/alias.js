var db = require('../db');

exports.getAll = (done) => {
  db.get().query('SELECT v.id, v.source, v.destination, d.name as domain FROM virtual_aliases v, virtual_domains d WHERE d.id = v.domain_id ORDER BY v.destination ASC;', (err, rows) => {
    if (err) {
      return done(err);
    };
    done(null, rows);
  });
};
