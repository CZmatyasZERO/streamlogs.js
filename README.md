# Streamlogs.js
- Manages logs by using node.js streams and events.
- levels: trace, debug, info, warn, error, fatal
## Objects

|Object|Description|
|-------|-----------|
|basicLogger|Readable stream sending logs in .log style. Support for colors|
|JSONlogger|Same as basicLogger, but in JSON format|
|defLog|Default instance of basicLogger, pipes into stdout, can be shared between modules|
|logLevel|enum of log levels|


## Examples
### New logger pipes into console
```javascript
const logger = require("streamlogs")
const log = new logger.basicLogger()
log.pipe(process.stdout)

log.addLog("Hello world!", logger.logLevel.info, "user")
```