const mysql = require('mysql');
const async = require('async');

var state = {
  pool: null,
  mode: null
};

const DEV_DB = 'mailserver';
const TEST_DB = 'test_mailserver';
const PRODUCTION_DB = 'dev_mailserver';

exports.MODE_DEV = 'mode_dev';
exports.MODE_TEST = 'mode_test';
exports.MODE_PRODUCTION = 'mode_production';

exports.connect = (mode, done) => {
  state.pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'node',
    database: DEV_DB
  });
  state.mode = mode;
  done();
};

exports.get = () => {
  return state.pool;
};
