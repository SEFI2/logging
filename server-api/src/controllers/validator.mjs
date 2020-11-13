// External imports
import validator from "express-validator";
import moment from "moment";

const { query, validationResult } = validator;
const isValidDate = value => moment(value).isValid();

function checkValidation(req) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw Error(JSON.stringify(errors));
  }
}

function validate(method) {
  switch (method) {
    case "getStats": {
      return [
        query("startTime")
          .notEmpty()
          .custom(isValidDate),
        query("endTime")
          .notEmpty()
          .custom(isValidDate)
      ];
    }
    case "checkTraffic": {
      return [
        query("startTime")
          .notEmpty()
          .custom(isValidDate),
        query("endTime")
          .notEmpty()
          .custom(isValidDate)
      ];
    }
    default: {
      return [];
    }
  }
}

export default { checkValidation, validate };
