class DiscountManager {
  #dateManager;

  constructor(dateManager) {
    this.#dateManager = dateManager;
  }

  #calculateChristmasDiscount() {
    if (this.#dateManager.isChristmasEvent()) {
      return this.#dateManager.getProfitDay() * 100 + 1000;
    }
    return 0;
  }

  #calculateWeekdayDiscount(dessertMenuCount) {
    if (this.#dateManager.isWeekdayEvent()) {
      return dessertMenuCount * 2023;
    }
    return 0;
  }

  #calculateWeekendDiscount(mainMenuCount) {
    if (this.#dateManager.isWeekendEvent()) {
      return mainMenuCount * 2023;
    }
    return 0;
  }

  #calculateSpecialDiscount() {
    if (this.#dateManager.isSpecialDayEvent()) {
      return 1000;
    }
    return 0;
  }

  discountDetails(dessertMenuCount, mainMenuCount) {
    const christmasDiscountPrice = this.#calculateChristmasDiscount();
    const weekdayDiscountPrice = this.#calculateWeekdayDiscount(dessertMenuCount);
    const weekendDiscountPrice = this.#calculateWeekendDiscount(mainMenuCount);
    const specialDayDiscountPrice = this.#calculateSpecialDiscount();

    return {
      '크리스마스 디데이 할인': christmasDiscountPrice,
      '평일 할인': weekdayDiscountPrice,
      '주말 할인': weekendDiscountPrice,
      '특별 할인': specialDayDiscountPrice,
    };
  }
}

export default DiscountManager;