const express = require('express');
const cors = require('cors');
const logger = require('./logger');
const config = require('./msdata/config/main.json');
const db = require('./src/db/connection');
const router = require('./src/routes/index');
const errorHandler = require('./src/middleware/error.handling')
const PORT = config.port;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);

app.use(errorHandler)

const start = async () => {
    try {
        db.sequelize.authenticate();
        db.sequelize.sync();
        app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));
    } catch (error) {
        throw Error(error);
    }
};

start();
