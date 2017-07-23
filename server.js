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
  }
})

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

// helpers

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
  alias.getAll((err, rows) => {
    if (err) {
      res.status(404).send();
    } else {
      res.render('alias.hbs', {
        rows: rows
      });
    };
  });
});

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
  console.log(req.body);
  res.status(200).send();
  return;
});

app.listen(3000, () => {
  console.log('Sever is up and running.');
});
