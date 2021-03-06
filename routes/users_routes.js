const express = require('express');
const user = require('../models/user');
const domain = require('../models/domain');

const router = express.Router();
let domains;

// get all users
router.get('/', (req, res) => {
  // get all Domains for dropdown in insert
  domain.getAll((err, rows) => {
    if (err) {
      domains = null;
    }
    domains = rows;
  });

  // get all users
  user.getAll((err, rows) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.render('users.hbs', {
        rows,
        domains });
    }
  });
});

// create a new user
router.post('/', (req, res) => {
  user.create(req.body, (err, result) => {
    if (err) {
      res.status(400).send();
    } else {
      res.status(200).send();
    }
  });
});

router.delete('/:user', (req, res) => {
  user.deleteByName(req.params.user, (err, result) => {
    res.status(200).send();
  });
});

module.exports = router;
