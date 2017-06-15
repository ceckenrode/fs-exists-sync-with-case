import * as fs from "fs";
import * as path from "path";

interface Options {
  cache: boolean;
}

type Result = null | true | false;

const cache: any = {};

// Checks to see if the information is cached before checking the file system
function fsExistsSyncWithCase(
  filePath: string,
  opts: Options = { cache: true }
): boolean {
  const fileDir = path.dirname(filePath);
  const fileBase = path.basename(filePath);
  if (opts.cache && cache[fileDir]) {
    return cache[fileDir].indexOf(fileBase) > -1;
  }
  try {
    return scanDirectory(filePath);
  } catch (e) {
    return false;
  }
}

function scanDirectory(filePath: string): boolean {
  let fileDir = filePath;
  let prevFilePath = filePath;
  let result: Result = null;

  while (result === null) {
    fileDir = path.dirname(fileDir);
    if (fileDir === "/" || fileDir === ".") {
      return (result = true);
    }
    const fileNames: string[] = (cache[fileDir] = fs.readdirSync(fileDir));
    if (~fileNames.indexOf(path.basename(prevFilePath))) {
      return (result = false);
    }
    prevFilePath = fileDir;
  }
  return result;
}

export default fsExistsSyncWithCase;
