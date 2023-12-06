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

process.on("uncaughtException", (err, origin) => {
    defLog.error(err.message, origin)
})

process.on("unhandledRejection", (reason, promise) => {
    defLog.error(String(reason), String(promise))
})

module.exports.defLog = defLog


module.exports.logLevel = logLevel;




