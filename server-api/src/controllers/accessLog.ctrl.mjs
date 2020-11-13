// Internal imports
import sortByHit from "./statistics/sortByHit.mjs";
import checkTraffic from "./statistics/checkTraffic.mjs";
import validator from "./validator";
import filterLogs from "./filterLogs.mjs";
import sortByUserAccess from "./statistics/sortByUserAccess.mjs";
import StatsD from "hot-shots";

const { checkValidation } = validator;
const { getTimeLogs } = filterLogs;
const dogstatsd = new StatsD();

export default {
  /**
   * getStats
   *
   * @param  {Request} req
   * @param  {Response} res
   * @param  {Function} next
   */
  getStats: async (req, res, next) => {
    try {
      dogstatsd.increment('page.views')

      // Check request
      checkValidation(req);

      // Destruct query
      const { startTime, endTime } = req.query;

      // Get logs within time period and check if any available
      const logs = await getTimeLogs(startTime, endTime);
      if (!logs || !logs.length) {
        res.send({
          ...req.query,
          sorted: []
        });
        return;
      }

      const hitSort = sortByHit(logs);
      const userSort = sortByUserAccess(logs);
      res.send({
        ...req.query,
        hitSort,
        userSort
      });
    } catch (err) {
      console.log({ err });
      res.send(err);
    }

    next();
  },

  /**
   * getTraffic
   *
   * @param  {Request} req
   * @param  {Response} res
   * @param  {Function} next
   */
  getTraffic: async (req, res, next) => {
    try {
      // Check request
      checkValidation(req);

      // Destruct query
      const { startTime, endTime } = req.query;

      // Get logs within time period and check if any available
      const logs = await getTimeLogs(startTime, endTime);
      if (!logs || !logs.length) {
        res.send({
          ...req.query,
          traffic: null
        });
        return;
      }

      // Get traffic for give logs
      const logsPerSecond = checkTraffic(logs.length, startTime, endTime);
      res.send({
        ...req.query,
        traffic: {
          logsPerSecond,
          hits: logs.length
        }
      });
    } catch (err) {
      console.log({ err });
      res.send(err);
    }

    next();
  }
};
