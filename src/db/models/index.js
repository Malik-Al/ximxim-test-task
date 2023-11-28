const { DB: sequelize } = require('../connection');
const { Sequelize } = require('sequelize');

const db = {};
db.User = require('../models/user.model')(sequelize, Sequelize)
db.File = require('../models/file.model')(sequelize, Sequelize)
db.db.LogFile = require('../models/log.file.model')(sequelize, Sequelize)


db.User.belongsToMany(File, { through: db.LogFile });
db.File.belongsToMany(User, { through: db.LogFile });