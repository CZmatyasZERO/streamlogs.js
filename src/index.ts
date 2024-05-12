export enum logLevel {
    trace,
    debug,
    info,
    warn,
    error,
    fatal
}

import basicLogger from "./basicLogger"
import JSONLogger from "./JSONLogger"

module.exports.basicLogger = basicLogger
module.exports.JSONLogger = JSONLogger

const defLog = new basicLogger(logLevel.info, "System", true)
defLog.pipe(process.stdout)


// error handlings
process.on("uncaughtException", (err, origin) => {
    defLog.error(err.stack ? err.stack : err.name, origin)
})

process.on("unhandledRejection", (reason, promise) => {
    defLog.error(String(reason), String(promise))
})

process.on('warning', (warning) => {
    defLog.warn(warning.message, warning.name);
});

module.exports.defLog = defLog


module.exports.logLevel = logLevel;




