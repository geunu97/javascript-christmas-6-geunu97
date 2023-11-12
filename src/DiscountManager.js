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
}

export default DiscountManager;
