import * as winston from "winston";


let logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            name: "info-file",
            filename: "./log/parity-app.log",
            level: "info"
        })
    ]
});
export default logger;