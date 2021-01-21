'use strict';

const db = require("../config/db");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(db.database, db.user, db.password, 
    { host: db.host, dialect: db.dialect, operatorsAliases: false});

const database = {};

database.Sequelize = Sequelize;
database.sequelize = sequelize;

database.sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully');
    })
    .catch(err => {
        console.log(err);
    });

module.exports = database;