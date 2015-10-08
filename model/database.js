var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://localhost:5432/rentals');
var Rental = sequelize.define('rental', {
  city: Sequelize.STRING,
  owner: Sequelize.STRING,
  bedrooms: Sequelize.INTEGER
});

sequelize.sync().then(function() {
  return Rental.create({
    city: 'Berlin',
    owner: 'Jason',
    bedrooms: 3
  });
}).then(function(Detroit) {
  console.log(Detroit.get({
    plain: true
  }));
});
