const Sequelize = require('sequelize');

const sequelize = new Sequelize('Inventary-Manegment-system','root','root',{
    dialect:'mysql',
    host:'localhost'
});

module.exports = sequelize;