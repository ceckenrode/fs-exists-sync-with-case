# fsExistSyncWithCase

## A Fast, Case-Sensitive Replacement for Node's Native fs.existSync

### Installation

```
npm install fs-exist-sync-with-case
```

### Usage

```js
var path = require("path");
var fsExistSyncWithCase = require("fs-exist-sync-with-case");


var fileExists = fsExistSyncWithCase(path.join(__dirname, "../../fiLeToCheCK/with/CASE.md"));
console.log(fileExists) // true or false
```
