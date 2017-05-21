import * as bodyParser from "body-parser";
import * as express from "express";
import * as morgan from 'morgan'
import * as compression from 'compression';
const path = require('path')
const FileStreamRotator = require('file-stream-rotator')
const healthCheck = require('connect-health-check');

import HelloRoute from "./routes/hello";

var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join("./log", 'http-parity-%DATE%.log'),
    frequency: 'daily',
    verbose: false
})

export default class Server {

    public app: express.Application;


    public static bootstrap(): Server {
        return new Server();
    }


    constructor() {
        this.app = express();
        this.initialize()
        this.routes();
    }


    public initialize() {

        this.app.use(compression());
        this.app.use(healthCheck);
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        this.app.use(bodyParser.json());

        this.app.use(morgan('combined', {
            stream: accessLogStream
        }))


        this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });


    }


    private routes() {
        const router: express.Router = express.Router();

        HelloRoute.create(router)

        this.app.use(router);
    }

}