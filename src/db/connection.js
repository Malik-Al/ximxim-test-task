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

db.user = require('./user.model')(sequelize, Sequelize);
db.file = require('./file.model')(sequelize, Sequelize);

db.user.hasMany(db.user, {foreignKey: 'user_id'});
db.file.belongsTo(db.file, {foreignKey: 'user_id'});

module.exports = db;
