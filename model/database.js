var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://localhost:5432/rentals');
var rental = sequelize.define('rental', {
  city: Sequelize.STRING,
  owner: Sequelize.STRING,
  bedrooms: Sequelize.INTEGER
});

sequelize.sync().then(function() {
  return rental.create({
    city: 'Detroit',
    owner: 'Jason',
    bedrooms: 4
  });
}).then(function(Detroit) {
  console.log(Detroit.get({
    plain: true
  }))
});
