"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var cache = {};
function fsExistsSyncWithCase(filePath, opts) {
    if (opts === void 0) { opts = { cache: true }; }
    var fileDir = path.dirname(filePath);
    var fileBase = path.basename(filePath);
    if (opts.cache && cache[fileDir]) {
        return cache[fileDir].indexOf(fileBase) > -1;
    }
    try {
        return scanDirectory(filePath);
    }
    catch (e) {
        return false;
    }
}
function scanDirectory(filePath) {
    var fileDir = filePath;
    var prevFilePath = filePath;
    var result = null;
    while (result === null) {
        fileDir = path.dirname(fileDir);
        if (fileDir === "/" || fileDir === ".") {
            return (result = true);
        }
        var fileNames = (cache[fileDir] = fs.readdirSync(fileDir));
        if (~fileNames.indexOf(path.basename(prevFilePath))) {
            return (result = false);
        }
        prevFilePath = fileDir;
    }
    return result;
}
exports.default = fsExistsSyncWithCase;
