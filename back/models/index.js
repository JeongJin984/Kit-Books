'use strict';

const  Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config')[env];
const db = {};

const CollegeList = ['컴퓨터공학과', '전자공학과', '산업공학과']

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

Promise.all(CollegeList.map(v => {
  db.College.findOrCreate({
    where: {
      name: v.trim()
    },
    defaults: {
      name: v.trim()
    }
  }).catch((error) => console.error(error))
}))

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
