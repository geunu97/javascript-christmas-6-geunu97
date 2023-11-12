class DiscountDateManager {
  #date;

  constructor(date) {    
    this.#date = date;    
  }

  getProfitDay() {
    return this.#date - 1;
  }

  isChristmasEvent() {
    return this.#date >= 1 && this.#date <= 25;
  }
}

export default DiscountDateManager;
