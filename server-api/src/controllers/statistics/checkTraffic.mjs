import moment from "moment";

/**
 * checkTraffic - Returns logs per second
 *
 * @param  {Number} logsCount
 * @param  {Date} startTime
 * @param  {Date} endTime
 */
export default function checkTraffic(logsCount, startTime, endTime) {
  const diffDate = moment(endTime).diff(moment(startTime), "seconds");
  return logsCount / diffDate;
}
