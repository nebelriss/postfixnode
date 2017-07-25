var db = require('../db');

exports.create = (newAliasVal, done) => {
  var values = [newAliasVal.domain, newAliasVal.source, newAliasVal.destination];
  console.log(values);
  db.get().query('INSERT INTO virtual_aliases (domain_id, source, destination) VALUES (?, ?, ?);', values, (err, rows) => {
    if (err) return done(err);
    done(null, rows);
  });
};

exports.getAll = (done) => {
  db.get().query('SELECT v.id, v.source, v.destination, d.name as domain FROM virtual_aliases v, virtual_domains d WHERE d.id = v.domain_id ORDER BY v.destination ASC;', (err, rows) => {
    if (err) {
      return done(err);
    };
    done(null, rows);
  });
};
