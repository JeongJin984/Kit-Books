'use strict';

const  Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Book = require('./book')(sequelize, Sequelize)
db.BookImage = require('./bookimage')(sequelize, Sequelize)
db.College = require('./college')(sequelize, Sequelize)
db.ProfileImage = require('./profileimage')(sequelize, Sequelize)
db.User = require('./user')(sequelize, Sequelize)
db.Warehouse = require('./warehouse')(sequelize, Sequelize)

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
