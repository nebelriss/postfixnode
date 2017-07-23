const mysql = require('mysql');
const async = require('async');

var state = {
  pool: null,
  mode: null
};

var DEV_DB = 'mailserver';
var TEST_DB = 'test_mailserver';
var PRODUCTION_DB = 'dev_mailserver';

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
