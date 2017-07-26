const express = require('express');
const user = require('../models/user')
const domain = require('../models/domain');

var router = express.Router();
var domains;

// get all users
router.get('/', (req, res) => {

  // get all Domains for dropdown in insert
  domain.getAll((err, rows) => {
    if (err)
      domains = null;
    domains = rows;
  });

  // get all users
  user.getAll((err, rows) => {
    if (err) {
      res.status(404).send();
    } else {
      res.render('users.hbs', {
        rows: rows,
        domains: domains
      });
    };
  });
});

// create a new user
router.post('/', (req, res) => {
  user.create(req.body, (err, result) => {
    if (err) {
      res.status(400).send();
    } else {
      res.status(200).send();
    };
  });
});

module.exports = router;
