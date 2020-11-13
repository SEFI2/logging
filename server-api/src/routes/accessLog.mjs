// Internal imports
import accessLogController from "../controllers/accessLog.ctrl.mjs";
import validator from "../controllers/validator.mjs";

// Declare
const { validate } = validator;
const { getStats, getTraffic } = accessLogController;

// Init routes
export default router => {
  router.route("/stats").get(validate("getStats"), getStats);
  router.route("/traffic").get(validate("getTraffic"), getTraffic);
};
