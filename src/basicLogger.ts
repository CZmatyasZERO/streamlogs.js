import colors from "./colors"
import { Readable } from "stream"
import { logLevel } from "./index"

type dateFunction = () => string;

export default class basicLogger extends Readable {
    colors:boolean = false; 
    defaultSender:string = "System"; 
    logLevel:logLevel = logLevel.info;
    constructor(level = logLevel.info, defaultSender = "System", colors = false) {
        super()
        this.colors = colors
        this.defaultSender = defaultSender
        this.logLevel = level
    }
    _read() {}
    _getdate() {
        let date = new Date()
        return date.toDateString() + " " + date.toLocaleTimeString()
    }
    setDateFunction(func:dateFunction) {
        this._getdate = func;
    }
    addLog(message:string, level:logLevel, sender = this.defaultSender) {
        let string
        switch (level) {
            case logLevel.trace:
                string = (this.colors ? colors.fg.gray : "") + "[trace] " + "[" + this._getdate() + "] " + sender + ": " + message + (this.colors ? colors.reset : "") + "\n"
                this.emit("logTrace", string, sender)
                if(this.logLevel <= level) {
                    this.push(string)
                }
                break;
            case logLevel.debug:
                string = "[debug] " + "[" + this._getdate() + "] " + sender + ": " + message + (this.colors ? colors.reset : "") + "\n"
                this.emit("logDebug", string, sender)
                if(this.logLevel <= level) {
                    this.push(string)
                }
                break;
            case logLevel.info:
                string = (this.colors ? colors.fg.cyan : "") + "[info] " + "[" + this._getdate() + "] " + sender + ": " + message + (this.colors ? colors.reset : "") + "\n"
                this.emit("logInfo", string, sender)
                if(this.logLevel <= level) {
                    this.push(string)
                }
                break;
            case logLevel.warn:
                string = (this.colors ? colors.fg.yellow : "") + "[warn] " + "[" + this._getdate() + "] " + sender + ": " + message + (this.colors ? colors.reset : "") + "\n"
                this.emit("logWarn", string, sender)
                if(this.logLevel <= level) {
                    this.push(string)
                }
                break;
            case logLevel.error:
                string = (this.colors ? colors.fg.red : "") + "[error] " + "[" + this._getdate() + "] " + sender + ": " + message + (this.colors ? colors.reset : "") + "\n"
                this.emit("logError", string, sender)
                if(this.logLevel <= level) {
                    this.push(string)
                }
                break;
            case logLevel.fatal:
                string = (this.colors ? colors.bg.red : "") + "[fatal] " + "[" + this._getdate() + "] " + sender + ": " + message + (this.colors ? colors.reset : "") + "\n"
                this.emit("logFatal", string, sender)
                if(this.logLevel <= level) {
                    this.push(string)
                }
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
