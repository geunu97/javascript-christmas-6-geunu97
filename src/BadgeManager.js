class BadgeManager {
  #totalDiscountPrice;

  constructor(totalDiscountPrice) {
    this.#totalDiscountPrice = totalDiscountPrice;
  }

  getBadge() {
    if (this.#totalDiscountPrice >= 20000) {
      return "산타";
    }
    if (this.#totalDiscountPrice >= 10000) {
      return "트리";
    }
    if (this.#totalDiscountPrice >= 5000) {
      return "별";
    }
    return "없음";
  }
}

export default BadgeManager;
