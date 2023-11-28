const { Sequelize } = require('sequelize');
const conf = require('../../msdata/config/main.json');

exports.init = async function () {
    exports.DB = new Sequelize(
        conf.mySqlConfig.database,
        conf.mySqlConfig.auth.user,
        conf.mySqlConfig.auth.password,
        {
            host: conf.mySqlConfig.host,
            // port: conf.mySqlConfig.schema,
            port: conf.mySqlConfig.port,
            dialect: conf.mySqlConfig.dialect,
            pool: {
                max: 20,
                idleTimeoutMillis: 30000,
                connectionTimeoutMillis: 2000,
            },
            logging: false,
        },
    );

    try {
        console.log('Database initialization...');
        // await exports.DB.authenticate();
        await exports.DB.sync();
        console.log('Connection Database successfully completed!');
        console.log('All models have been successfully initialized!');
    } catch (error) {
        new Error(error, 'Error connecting to the Database');
    }
};
