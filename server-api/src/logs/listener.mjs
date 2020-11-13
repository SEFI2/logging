// External imports
import tail from "tail";
import moment from "moment";

// Internal imports
import AccessLog from "../models/AccessLog.mjs";

/**
 * startListenLogs - Listens to file changes and reads it line by line (see tail -f)
 *
 * @param  {String} logPath - path to file
 * @returns {void}
 */
export default function startListenLogs(logPath) {
  // Initialize tail to read lines from file
  const watcher = new tail.Tail(logPath);
  watcher.watch();

  // Process the data when line is added
  watcher.on("line", async data => {
    // Parse new line with regexs
    const results = data.match(
      /^(\S+) (\S+) (\S+) \[([\w:/]+\s[+\-]\d{4})\] "(\S+) (\S+)\s*(\S+)?\s*" (\d{3}) (\S+)/
    );

    // Check if results are valid
    if (!results || results.length !== 10) {
      throw Error(
        `Invalid parsing with regex for ${data}. Results: ${results}`
      );
    }

    // Save logs
    await new AccessLog({
      rawLog: results[0],
      address: results[1],
      user: results[3],
      requestTime: moment(results[4], "DD/MMM/YYYY:HH:mm:ss ZZ").format(),
      requestType: results[5],
      requestPath: results[6],
      httpVersion: results[7],
      statusCode: results[8],
      requestSize: results[9]
    }).save();
  });
}
