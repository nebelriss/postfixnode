// imports
const express = require('express');
const hbs = require('hbs');
const mysql = require('mysql')

// init express
var app = express();

// Open MySQL-Connection
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'node',
  database: 'mailserver'
});

con.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

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

  con.query('select u.id, d.name, u.email from virtual_users u, virtual_domains d where d.id = u.domain_id order by u.id asc;', function(err, rows, fields) {
    if (!err) {
      // render if no error
      res.render('users.hbs', {
        rows: rows
      });
    } else {
      console.log('Error while performing Query.');
    }});

});

// Alias
app.get('/alias', (req, res) => {

  con.query('SELECT v.id, v.source, v.destination, d.name as domain FROM virtual_aliases v, virtual_domains d WHERE d.id = v.domain_id order by v.destination asc;', function(err, rows, fields) {
    if (!err) {
      // render if no error
      res.render('alias.hbs', {
        rows: rows
      });
    } else {
      console.log('Error while performing Query.');
    }});

});

// Domains
app.get('/domains', (req, res) => {
  con.query('select id, name from virtual_domains order by id asc;', function(err, rows, fields) {
    if (!err) {
      // render if no error
      res.render('domains.hbs', {
        rows: rows
      });
    } else {
      console.log('Error while performing Query.');
    }});
});

app.listen(3000, () => {
  console.log('Sever is up and running.');
});
