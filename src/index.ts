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
module.exports.defLog = defLog


module.exports.logLevel = logLevel;




