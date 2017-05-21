import Server from "./server";

import * as cluster from 'cluster'
import logger from "./utils/logger";

const config = require('config');
const noOfChild = config.forkCount

export  default class Init {


    listen() {

        if (cluster.isMaster) {
            for (let i = 0; i < noOfChild; i++) {
                cluster.fork()
            }

            cluster.on('exit', (worker, code, signal) => {
                logger.info(`worker ${worker.process.pid} died`);
            });

        }
        else if (cluster.isWorker) {


            new Server().app.listen(config.appPort)
        }

    }
}

new Init().listen()