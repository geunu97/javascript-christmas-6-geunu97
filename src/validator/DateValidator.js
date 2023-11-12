import Formatter from "../utils/Formatter.js";

class DateValidator {
  static validateBlank(date) {
    if (date.includes(" ")) {
      throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
    }
  }

  static validateIsNumber(date) {
    if (isNaN(date)) {
      throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
    }
  }

  static validateRange(date) {
    const integerDate = Formatter.convertToNumber(date);
    if (1 > integerDate || integerDate > 31) {
      throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
    }
  }

  static validateInteger(date) {
    const integerDate = Formatter.convertToNumber(date);
    if (!Number.isInteger(integerDate)) {
      throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
    }
  }
}

export default DateValidator;
