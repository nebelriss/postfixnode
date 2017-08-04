// imports
const express = require('express');
const path = require('path');
const hbs = require('hbs');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const db = require('./db');
const usersRoutes = require('./routes/users_routes');
const aliasRoutes = require('./routes/alias_routes');
const domainsRoutes = require('./routes/domain_routes');

// init express
const app = express();

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
});

// partials
hbs.registerPartials(path.join(__dirname, '/views/partials'));

// set view engine
app.set('view engine', 'hbs');

// static routing
app.use(express.static(path.join(__dirname, '/public')));

// root
app.get('/', (req, res) => {
  res.render('home.hbs', {
  });
});

// routes
app.use('/users', usersRoutes);
app.use('/alias', aliasRoutes);
app.use('/domains', domainsRoutes);

// start
app.listen(3000, () => {
  console.log('Sever is up and running.');
});
