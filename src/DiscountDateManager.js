import EVENT_DATE from "./constant/EventDate.js";
import Formatter from "./utils/Formatter.js";
import DateValidator from "./validator/DateValidator.js";

class DiscountDateManager {
  #date;

  constructor(date) {
    this.#validate(date);
    this.#date = Formatter.convertToNumber(date);
  }

  #validate(date) {
    DateValidator.validateBlank(date);
    DateValidator.validateIsNumber(date);
    DateValidator.validateRange(date);
    DateValidator.validateInteger(date);
  }

  #getDayOfWeek() {
    return new Date(EVENT_DATE.YEAR, EVENT_DATE.MONTH - 1, this.#date).getDay();
  }

  getProfitDay() {
    return this.#date - 1;
  }

  isChristmasEvent() {
    return EVENT_DATE.CHRISTMAS.includes(this.#date);
  }

  isWeekdayEvent() {
    const dayOfWeek = this.#getDayOfWeek();
    return EVENT_DATE.WEEKDAY.includes(dayOfWeek);
  }

  isWeekendEvent() {
    const dayOfWeek = this.#getDayOfWeek();
    return EVENT_DATE.WEEKEND.includes(dayOfWeek);
  }

  isSpecialDayEvent() {
    return EVENT_DATE.SPECIALDAY.includes(this.#date);
  }
}

export default DiscountDateManager;
