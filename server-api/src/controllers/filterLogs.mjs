// Internal imports
import AccessLog from "../models/AccessLog.mjs";

/**
 * getTimeLogs
 *
 * @param {Date} startTime
 * @param {Date} endTime
 * @returns [AccessLog]
 */
function getTimeLogs(startTime, endTime) {
  return AccessLog.find({
    created: {
      $gte: startTime,
      $lte: endTime
    }
  });
}

/**
 * getTimeLogs
 *
 * @param {Date} startTime
 * @param {Date} endTime
 * @returns [AccessLog]
 */
function getAddressLogs(address) {
  return AccessLog.find({
    address
  });
}

export default { getTimeLogs, getAddressLogs };
