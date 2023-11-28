const express = require('express');
const cors = require('cors');
const logger = require('./logger');
const config = require('./msdata/config/main.json');
const db = require('./src/db/connection');
const PORT = config.port;

const app = express();
app.use(cors());
app.use(express.json());

const start = async () => {
    try {
        await db.init();
        app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));
    } catch (error) {
        throw Error(error);
    }
};

start();
