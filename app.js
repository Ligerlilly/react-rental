var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var routes = require('./routes/index');

var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://localhost:5432/rentals');
var Rental = sequelize.define('rental', {
  city: Sequelize.STRING,
  owner: Sequelize.STRING,
  bedrooms: Sequelize.INTEGER
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(3000, function() {
  console.log('listening on port 3000');
});
