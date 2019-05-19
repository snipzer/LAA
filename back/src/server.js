const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./config/Logger');
const StatusHandler = require('./middleware/StatusHandler');
const DatastoreConnector = require('./config/DatastoreConnector');
const session = require('express-session');
const DatastoreStore = require('@google-cloud/connect-datastore')(session);
const { Datastore } = require('@google-cloud/datastore');
const ModelFactory = require('./factory/ModelFactory');
const DaoFactory = require('./factory/DaoFactory');
const ServiceFactory = require('./factory/ServiceFactory');
const ControllerFactory = require('./factory/ControllerFactory');
const helmet = require('helmet');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.router = express.Router();
        this.models = {};
        this.daos = {};
        this.services = {};
        this.setBodyParser();
        this.setPort();
        this.setStatusCodeHandler();
        this.setSecurity();
        this.app.disable('x-powered-by');
    }

    /**
     * * Formatting Port
     */
    static normalizePort(val) {
        const port = parseInt(val, 10);
        if (typeof port !== 'number') {
            return val;
        }
        if (port >= 0) {
            return port;
        }
        return false;
    }

    /**
     * * Bootstrapping Server
     */
    run() {
        DatastoreConnector.connect().then(() => {
            this.setSession().then(() => {
                ModelFactory.initModels(this.models, logger).then(() => {
                    DaoFactory.initDaos(this.daos, this.models, logger).then(() => {
                        ServiceFactory.initServices(this.services, this.daos, logger).then(() => {
                            ControllerFactory.initController(this.app, this.router, this.services, this.statusHandler, logger).then(() => {
                                this.app.listen(this.port, () => logger.info(`Server started on port ${this.port} !`));
                            }).catch(err => logger.error(err.message));
                        }).catch(err => logger.error(err.message));
                    }).catch(err => logger.error(err.message));
                }).catch(err => logger.error(err.message));
            }).catch(err => logger.error(err.message));
        }).catch(err => logger.error(err.message));
    }

    /**
     * * Server Port Configuration
     */
    setPort() {
        logger.info('Getting Server\'s Port...');
        this.port = Server.normalizePort(process.env.PORT || 3000);
    }

    /**
     * * Handling status code
     */
    setStatusCodeHandler() {
        this.statusHandler = new StatusHandler(logger);
        this.app.use(this.statusHandler.handleStatusCode.bind(this.statusHandler));
        this.app.use(this.statusHandler.handleError.bind(this.statusHandler));
    }

    /**
     * * Parser Configuration
     */
    setBodyParser() {
        logger.info('bodyParser configuration...');
        this.router.use(bodyParser.json());
        this.router.use(bodyParser.urlencoded({ extended: true }));
    }

    /**
     * * Session Configuration
     */
    setSession() {
        return new Promise((resolve, reject) => {
            try {
                this.app.set('trust proxy', 1);
                this.app.use(session({
                    secret: process.env.API_TOKEN_SECRET,
                    resave: true,
                    saveUninitialized: false,
                    store: new DatastoreStore({
                        dataset: new Datastore({
                            kind: 'express-sessions',
                            namespace: 'development',
                            projectId: process.env.PROJECT_ID
                        })
                    }),
                    cookie: {
                        path: '/',
                        domain: process.env.FRONT_URL_DOMAIN,
                        httpOnly: false,
                        maxAge: new Date(2018, 0, 1).getTime(),
                        secure: false,
                    }
                }));
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }

    setSecurity() {
        this.app.use(helmet());
        this.app.use(cors({
            origin: process.env.FRONT_URL_ORIGIN,
            optionsSuccessStatus: 200,
            credentials: true
        }));
    }

}

module.exports = Server;
