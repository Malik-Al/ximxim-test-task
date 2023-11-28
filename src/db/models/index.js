const { DB: sequelize } = require('../connection');
const { Sequelize } = require('sequelize');

const db = {};
db.User = require('../models/user.model')(sequelize, Sequelize)
db.File = require('../models/file.model')(sequelize, Sequelize)

db.User.hasMany(db.File);
db.File.belongsTo(db.User);
