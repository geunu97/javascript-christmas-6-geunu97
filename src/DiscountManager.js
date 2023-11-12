class DiscountManager {
  #dateManager;

  constructor(dateManager) {
    this.#dateManager = dateManager;
  }

  calculateChristmasDiscount() {
    if (this.#dateManager.isChristmasEvent()) {
      return this.#dateManager.getProfitDay() * 100 + 1000;
    }
    return 0;
  }

  calculateWeekdayDiscount(dessertMenuCount) {
    if (this.#dateManager.isWeekdayEvent()) {
      return dessertMenuCount * 2023;
    }
    return 0;
  }

  calculateWeekendDiscount(mainMenuCount) {
    if (this.#dateManager.isWeekendEvent()) {
      return mainMenuCount * 2023;
    }
    return 0;
  }

  calculateSpecialDiscount() {
    if (this.#dateManager.isSpecialDayEvent()) {
      return 1000;
    }
    return 0;
  }
}

export default DiscountManager;
