// imports
const express = require('express');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const db = require('./db');
const domain = require('./models/domain');
const user = require('./models/user');
const alias = require('./models/alias');

// init express
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

// Open MySQL-Connection
db.connect(db.MODE_DEV, (err) => {
  if (err) {
    console.log('Unable to connect to MySQL.');
    process.exit(1);
  } else {
    console.log('Connected to MySQL.');
  };
});

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

// static routing
app.use(express.static(__dirname + "/public"));

// root
app.get('/', (req, res) => {
  res.render('home.hbs', {
  });
});

// Users
app.get('/users', (req, res) => {
  user.getAll((err, rows) => {
    if (err) {
      res.status(404).send();
    } else {
      res.render('users.hbs', {
        rows: rows
      });
    };
  });
});

// Alias
app.get('/alias', (req, res) => {

  // get all Domains for dropdown in insert
  var domains;
  domain.getAll((err, rows) => {
    if (err) domains = null;
    domains = rows;
  });

  // get all alias entries
  alias.getAll((err, rows) => {
    if (err) {
      res.status(404).send();
    } else {
      res.render('alias.hbs', {
        rows: rows,
        domains: domains
      });
    };
  });
});

app.post('/alias', (req, res) => {
  alias.create(req.body, (err, result) => {
    if (err) {
      res.status(400).send();
    } else {
      res.status(200).send();
    }
  })
})

// Domains
app.get('/domains', (req, res) => {
  domain.getAll((err, rows) => {
    if (err) {
      res.status(404).send();
    } else {
      res.render('domains.hbs', {
        rows: rows
      });
    };
  });
});

app.post('/domains', (req, res) => {
  domain.create(req.body.domain, (err, result) => {
    if (err) {
      res.status(404).send();
    } else {
      res.status(200).send();
    };
  });
});

app.listen(3000, () => {
  console.log('Sever is up and running.');
});
