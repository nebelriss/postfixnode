const db = require('../db');

exports.create = (newAliasVal, done) => {
  const values = [newAliasVal.domain, newAliasVal.source, newAliasVal.destination];
  db.get().query('INSERT INTO virtual_aliases (domain_id, source, destination) VALUES (?, ?, ?);', values, (err, rows) => {
    if (err) return done(err);
    return done(null, rows);
  });
};

exports.getAll = (done) => {
  db.get().query('SELECT v.id, v.source, v.destination, d.name as domain FROM virtual_aliases v, virtual_domains d WHERE d.id = v.domain_id ORDER BY v.destination ASC;', (err, rows) => {
    if (err) {
      return done(err);
    }
    return done(null, rows);
  });
};

exports.deleteByName = (aliasName, done) => {
  db.get().query('DELETE FROM virtual_aliases WHERE source = ?', aliasName, (err, rows) => {
    if (err) return done(err);
    return done(null, rows);
  });
};
