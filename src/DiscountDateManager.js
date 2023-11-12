class DiscountDateManager {
  #date;

  constructor(date) {    
    this.#date = date;    
  }

  #getDayOfWeek() {
    return new Date(2023, 11, this.#date).getDay();
  }

  getProfitDay() {
    return this.#date - 1;
  }

  isChristmasEvent() {
    return this.#date >= 1 && this.#date <= 25;
  }

  isWeekdayEvent() {
    const dayOfWeek = this.#getDayOfWeek();
    return dayOfWeek >= 0 && dayOfWeek <= 4;
  }
}

export default DiscountDateManager;
