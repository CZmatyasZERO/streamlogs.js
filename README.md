## Streamlogs.js

*   Manages logs by using node.js streams and events.
*   levels: trace, debug, info, warn, error, fatal
*   You can add listeners to logs

## Objects

| Object | Description |
| --- | --- |
| basicLogger | Readable stream sending logs in .log style. Support for colors |
| JSONlogger | Same as basicLogger, but in JSON format |
| defLog | Default instance of basicLogger, pipes into stdout, can be shared between modules |
| logLevel | enum of log levels |

## Examples

### Using default logger (that pipes to console)

```javascript
const { defLog } = require("streamlogs")

defLog.info("Hello world!", "user")
```

### New logger pipes into standard output

```plaintext
const logger = require("streamlogs")
const log = new logger.basicLogger()
log.pipe(process.stdout)

log.addLog("Hello world!", logger.logLevel.info, "user")
```

### You can also use ECMAscript

```javascript
import { defLog } from "streamlogs"

defLog.info("Hello world!", "user")
```