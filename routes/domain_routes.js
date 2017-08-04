const express = require('express');
const domain = require('../models/domain');

var router = express.Router();

// get all domains
router.get('/', (req, res) => {
  domain.getAll((err, rows) => {
    if (err) {
      res.status(404).send();
    } else {
      res.render('domains.hbs', {rows: rows});
    };
  });
});

// create a new domain
router.post('/', (req, res) => {
  domain.create(req.body.domain, (err, result) => {
    if (err) {
      res.status(404).send();
    } else {
      res.status(200).send();
    };
// delete an entry
router.delete('/:domain', (req, res) => {
  domain.deleteByName(req.params.domain, (err, result) => {
    res.status(200).send();
  });
});

module.exports = router;
