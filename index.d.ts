import { Readable } from 'stream';
import { EventEmitter } from 'events';
export enum logLevel {trace, debug, info, warn, error, fatal};
type dateFunction = () => string;
interface JSONMessage {message:string, level:logLevel, sender:string, timestamp:Date}

interface JSONLogEvents {
    data: (chunk: string) => void;
    end: () => void;
    close: () => void;
    error: (err: Error) => void;
    pause: () => void;
    readable: () => void;
    resume: () => void;
    log: (object:JSONMessage) => void;
    logTrace: (object:JSONMessage) => void;
    logDebug: (object:JSONMessage) => void;
    logInfo: (object:JSONMessage) => void;
    logWarn: (object:JSONMessage) => void;
    logError: (object:JSONMessage) => void;
    logFatal: (object:JSONMessage) => void;
}

interface basicLogEvents {
    data: (chunk: string) => void;
    end: () => void;
    close: () => void;
    error: (err: Error) => void;
    pause: () => void;
    readable: () => void;
    resume: () => void;
    logTrace: (message:string) => void;
    logDebug: (message:string) => void;
    logInfo: (message:string) => void;
    logWarn: (message:string) => void;
    logError: (message:string) => void;
    logFatal: (message:string) => void;
}

export declare class basicLogger extends Readable, EventEmitter {
    colors:boolean
    defaultSender:string
    logLevel:logLevel
    output:(string | string[])
    constructor(level?:logLevel, defaultSender?:string, colors?:boolean)
    addLog(message:string, level:logLevel, sender?:string):void;
    trace(message:string, sender?:string):void
    info(message:string, sender?:string):void
    warn(message:string, sender?:string):void
    error(message:string, sender?:string):void
    fatal(message:string, sender?:string):void
    setDateFunction(func:DateFunction):void
    emit(event: keyof basicLogEvents, ...args: any[]): boolean;
    on<K extends keyof basicLogEvents>(event: K, listener: basicLogEvents[K]): void
    once<K extends keyof basicLogEvents>(event: K, listener: basicLogEvents[K]): void
    prependListener<K extends keyof basicLogEvents>(event: K, listener: basicLogEvents[K]):void
    prependOnceListener<K extends keyof basicLogEvents>(event: K, listener: basicLogEvents[K]):void
    removeListener<K extends keyof basicLogEvents>(event: K, listener: basicLogEvents[K]):void
    addListener<K extends keyof basicLogEvents>(event: K, listener: basicLogEvents[K]):void
}


export declare class JSONLogger extends Readable, EventEmitter {
    defaultSender:string
    logLevel:logLevel
    output:(string | string[])
    constructor(level?:logLevel, defaultSender?:string)
    addLog(message:string, level:logLevel, sender?:string):void;
    trace(message:string, sender?:string):void
    info(message:string, sender?:string):void
    warn(message:string, sender?:string):void
    error(message:string, sender?:string):void
    fatal(message:string, sender?:string):void
    emit(event: keyof JSONLogEvents, ...args: any[]): boolean;
    on<K extends keyof JSONLogEvents>(event: K, listener: JSONLogEvents[K]): void
    once<K extends keyof JSONLogEvents>(event: K, listener: JSONLogEvents[K]): void
    prependListener<K extends keyof JSONLogEvents>(event: K, listener: JSONLogEvents[K]):void
    prependOnceListener<K extends keyof JSONLogEvents>(event: K, listener: JSONLogEvents[K]):void
    removeListener<K extends keyof JSONLogEvents>(event: K, listener: JSONLogEvents[K]):void
    addListener<K extends keyof JSONLogEvents>(event: K, listener: JSONLogEvents[K]):void
}

export const defLog = new basicLogger();