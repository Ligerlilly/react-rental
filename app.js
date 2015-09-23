var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/rentals.json', function(req, res) {
  fs.readFile('rentals.json', function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/rentals.json', function(req, res) {
  fs.readFile('rentals.json', function(err, data) {
    var rentals = JSON.parse(data);
    rentals.push(req.body);
    fs.writeFile('rentals.json', JSON.stringify(rentals, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(rentals);
    });
  });
});

app.delete('rentals.json', function(req, res) {
  fs.readFile('rentals.json', function(err, data) {
    var rentals = JSON.parse(data);
    for (var i in rentals) {
      if ((rentals[i].city === req.body.city) && (rentals[i].onwer === req.body.onwer)) {
        rentals.splice(i, 1);
      }
    }
    fs.writeFile('rental.json', JSON.stringify(rentals, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(rentals);
    });
  });
});
app.listen(3000, function() {
  console.log('listening on port 3000');
});
