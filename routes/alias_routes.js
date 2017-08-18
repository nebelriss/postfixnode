const express = require('express');
const alias = require('../models/alias');
const domain = require('../models/domain');

const router = express.Router();
let domains;

router.get('/', (req, res) => {
  // get all Domains for dropdown in insert
  domain.getAll((err, rows) => {
    if (err) {
      domains = null;
    }
    domains = rows;
  });

  // get all alias entries
  alias.getAll((err, rows) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.render('alias.hbs', {
        rows,
        domains });
    }
  });
});

// create a new alias
router.post('/', (req, res) => {
  alias.create(req.body, (err, result) => {
    if (err) {
      res.status(400).send();
    } else {
      res.status(200).send();
    }
  });
});

router.delete('/:alias', (req, res) => {
  alias.deleteByName(req.params.alias, (err, result) => {
    res.status(200).send();
  });
});

module.exports = router;
