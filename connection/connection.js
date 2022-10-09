const sequelize = require('sequelize');
const dontenv = require('dotenv');
const sequelize = require('sequelize');
const exp = require('constants');

//database?
const sequelize = new sequelize(process.env.DB_name, process.env.DB_user, process.env.BD_PW{
    host:'localhost',
    dialect:'mysql',
    port: 3306
});
module.export= sequelize;