const db = require('../db');

// Create a new entry
exports.create = (domain, done) => {
  const values = [domain];
  db.get().query('INSERT INTO virtual_domains (name) values(?);', values, (err, result) => {
    if (err) {
      return done(err);
    }
    return done(null, result.insertId);
  });
};

// get all existing records
exports.getAll = (done) => {
  db.get().query('SELECT id, name FROM virtual_domains ORDER BY id ASC;', (err, rows) => {
    if (err) {
      return done(err);
    }
    return done(null, rows);
  });
};

// get entry by name
exports.findById = (done) => {
  db.get().query('SELECT id, name FROM virtual_domains WHERE name = ?;', (err, rows) => {
    if (err) return done(err);
    return done(null, rows);
  });
};

// delete entry
exports.deleteByName = (domain, done) => {
  db.get().query('DELETE FROM virtual_domains WHERE name = ?', domain, (err, rows) => {
    if (err) return done(err);
    return done(null, rows);
  });
};
