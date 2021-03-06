var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://localhost:5432/rentals');
var Rental = sequelize.define('rental', {
  city: Sequelize.STRING,
  owner: Sequelize.STRING,
  bedrooms: Sequelize.INTEGER
});

router.get('/rentals.json', function(req, res) {
  var jsonData = [];
  Rental.findAll({attributes: ['city', 'owner', 'bedrooms', 'id'], order: 'id ASC'}).then(function(data) {
    for (var i = 0; i < data.length; i++) {
      jsonData.push({ "city": data[i].dataValues.city, 'owner': data[i].dataValues.owner, "bedrooms": data[i].dataValues.bedrooms, "id": data[i].dataValues.id });
    }
    res.json(jsonData);
  });

});


router.post('/rentals.json', function(req, res) {
  Rental.create({
    city: req.body.city,
    owner: req.body.owner,
    bedrooms: req.body.bedrooms
  }).then(function() {
    var jsonData = [];
    Rental.findAll({attributes: ['city', 'owner', 'bedrooms', 'id'], order: 'id ASC'}).then(function(data) {
      for (var i = 0; i < data.length; i++) {
        jsonData.push({ "city": data[i].dataValues.city, 'owner': data[i].dataValues.owner, "bedrooms": data[i].dataValues.bedrooms, "id": data[i].dataValues.id  });
      }
      res.json(jsonData);
    });
  });



});
//
router.delete('/rentals.json', function(req, res) {
  Rental.destroy({where: { id: req.body.id } }).then(function(){
    var jsonData = [];
    Rental.findAll({attributes: ['city', 'owner', 'bedrooms', 'id'], order: 'id ASC'}).then(function(data) {
      for (var i = 0; i < data.length; i++) {
        jsonData.push({ "city": data[i].dataValues.city, 'owner': data[i].dataValues.owner, "bedrooms": data[i].dataValues.bedrooms, "id": data[i].dataValues.id });
      }
      res.json(jsonData);
    });
  });

});

router.put('/rentals.json', function(req, res) {
  Rental.find({ where: {id: req.body.id} }).then(function(rental) {
    if (rental) { // if the record exists in the db
      var city = req.body.city !== '' ? req.body.city : rental.city;
      var owner = req.body.owner !== '' ? req.body.owner : rental.owner;
      var bedrooms = req.body.bedrooms !== '' ? req.body.bedrooms : rental.bedrooms;
      rental.updateAttributes({
        city: city,
        owner: owner,
        bedrooms: bedrooms
      }).then(function()  {
        var jsonData = [];
        Rental.findAll({attributes: ['city', 'owner', 'bedrooms', 'id'], order: 'id ASC'}).then(function(data) {
          for (var i = 0; i < data.length; i++) {
            jsonData.push({ "city": data[i].dataValues.city, 'owner': data[i].dataValues.owner, "bedrooms": data[i].dataValues.bedrooms, "id": data[i].dataValues.id });
          }
          res.json(jsonData);
        });
      });
    }
  });
});

  // fs.readFile('rentals.json', function(err, data) {
  //   res.setHeader('Cache-Control', 'no-cache');
  //   res.json(JSON.parse(data));
  // });

  // fs.readFile('rentals.json', function(err, data) {
  //   var rentals = JSON.parse(data);
  //   rentals.push(req.body);
  //   fs.writeFile('rentals.json', JSON.stringify(rentals, null, 4), function(err) {
  //     res.setHeader('Cache-Control', 'no-cache');
  //     res.json(rentals);
  //   });
  // });

  //   // fs.readFile('rentals.json', function(err, data) {
  //   //   var rentals = JSON.parse(data);
  //   //   for (var i in rentals) {
  //   //     if ((rentals[i].city === req.body.city) && (rentals[i].onwer === req.body.onwer)) {
  //   //       rentals.splice(i, 1);
  //   //     }
  //   //   }
  //   //   fs.writeFile('rentals.json', JSON.stringify(rentals), function(err) {
  //   //     res.setHeader('Cache-Control', 'no-cache');
  //   //     res.json(rentals);
  //   //   });
  //   // });
module.exports = router;
