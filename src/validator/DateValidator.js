import ERROR_MESSAGE from "../constant/ErrorMessage.js";
import Formatter from "../utils/Formatter.js";

class DateValidator {
  static validateBlank(date) {
    if (date.includes(" ")) {
      throw new Error(ERROR_MESSAGE.NOT_VALID_DATE);
    }
  }

  static validateIsNumber(date) {
    if (isNaN(date)) {
      throw new Error(ERROR_MESSAGE.NOT_VALID_DATE);
    }
  }

  static validateRange(date) {
    const integerDate = Formatter.convertToNumber(date);
    if (1 > integerDate || integerDate > 31) {
      throw new Error(ERROR_MESSAGE.NOT_VALID_DATE);
    }
  }

  static validateInteger(date) {
    const integerDate = Formatter.convertToNumber(date);
    if (!Number.isInteger(integerDate)) {
      throw new Error(ERROR_MESSAGE.NOT_VALID_DATE);
    }
  }
}

export default DateValidator;
