import { Readable } from "stream"
import { logLevel } from "./index"

interface JSONMessage {message:string, level:logLevel, sender:string, timestamp:Date}

export default class basicLogger extends Readable {
    defaultSender = "System"
    logLevel = logLevel.info
    constructor(level = logLevel.info, defaultSender = "System",) {
        super()
        this.defaultSender = defaultSender
        this.logLevel = level
    }
    _read() {}

    addLog(message:string, level:logLevel, sender = this.defaultSender) {
        let object:JSONMessage = {message:message, level:level, sender:sender, timestamp:new Date()}
        if(this.logLevel <= level) {
            this.push(JSON.stringify(object))
        }
        this.emit("log", object)
        switch (level) {
            case logLevel.trace:
                this.emit("logTrace", object)
                break;
            case logLevel.debug:
                this.emit("logDebug", object)
                break;
            case logLevel.info:
                this.emit("logInfo", object)
                break;
            case logLevel.warn:
                this.emit("logWarn", object)
                break;
            case logLevel.error:
                this.emit("logError", object)
                break;
            case logLevel.fatal:
                this.emit("logFatal", object)
                break;
            default:
                break;
        }
    }

    trace(message:string, sender = this.defaultSender) {
        this.addLog(message, logLevel.trace, sender)
    }
    debug(message:string, sender = this.defaultSender) {
        this.addLog(message, logLevel.debug, sender)
    }
    info(message:string, sender = this.defaultSender) {
        this.addLog(message, logLevel.info, sender)
    }
    warn(message:string, sender = this.defaultSender) {
        this.addLog(message, logLevel.warn, sender)
    }
    error(message:string, sender = this.defaultSender) {
        this.addLog(message, logLevel.error, sender)
    }
    fatal(message:string, sender = this.defaultSender) {
        this.addLog(message, logLevel.fatal, sender)
    }

}
