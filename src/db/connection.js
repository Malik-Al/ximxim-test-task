const Sequelize = require('sequelize');
const conf = require('../../msdata/config/main.json');

const sequelize = new Sequelize(
    conf.mySqlConfig.database,
    conf.mySqlConfig.auth.user,
    conf.mySqlConfig.auth.password,
    {
        host: conf.mySqlConfig.host,
        dialect: conf.mySqlConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: 20,
            acquire: 30000,
            idle: 10000,
        },
        define: {
            timestamps: false
        },
        // logging: false,
    },
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.model')(sequelize, Sequelize);
db.File = require('./file.model')(sequelize, Sequelize);

db.User.hasMany(db.User, {foreignKey: 'user_id'});
db.File.belongsTo(db.File, {foreignKey: 'user_id'});

module.exports = db;
